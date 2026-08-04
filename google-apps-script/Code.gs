/**
 * Evidence Engine · Backend Apps Script para Simón Movilidad
 * ---------------------------------------------------------------------------
 * Este script se pega en el editor de Apps Script LIGADO a la hoja de cálculo
 * (Extensiones → Apps Script) y se publica como Aplicación web.
 *
 * Hace tres cosas para el portal:
 *   - upload : guarda el archivo en una carpeta de Drive y registra la fila.
 *   - list   : devuelve todo el historial (más reciente primero).
 *   - delete : elimina la fila del historial y envía el archivo a la papelera.
 *
 * PASOS DE PUBLICACIÓN (ver README):
 *   1. Cambia TOKEN por un secreto propio (el mismo que pondrás en Vercel
 *      como APPS_SCRIPT_TOKEN).
 *   2. Implementar → Nueva implementación → Aplicación web.
 *        · Ejecutar como: Yo
 *        · Quién tiene acceso: Cualquier usuario
 *   3. Copia la URL /exec y ponla en Vercel como APPS_SCRIPT_URL.
 * ---------------------------------------------------------------------------
 */

// ⚠️ Cambia este valor y usa el MISMO en Vercel (APPS_SCRIPT_TOKEN).
var TOKEN = "CAMBIA_ESTE_TOKEN";

var SHEET_NAME = "Historial";
var FOLDER_NAME = "Evidence Engine · Archivos Simón Movilidad";
var HEADERS = [
  "Fecha", "Hora", "Usuario", "Correo", "Nombre", "Descripción",
  "Nombre del archivo", "Tipo", "URL del archivo", "Categoría", "id", "isoTimestamp",
];

function doGet(e) { return handle(e); }
function doPost(e) { return handle(e); }

function handle(e) {
  try {
    var p = {};
    if (e && e.postData && e.postData.contents) {
      p = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      p = e.parameter;
    }
    if (String(p.token) !== String(TOKEN)) return json({ error: "No autorizado." });

    switch (p.action) {
      case "list":   return json({ records: listRecords() });
      case "upload": return json({ record: uploadFile(p) });
      case "delete": return json(deleteRecord(p.id));
      default:       return json({ error: "Acción desconocida." });
    }
  } catch (err) {
    return json({ error: String(err) });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  }
  return sh;
}

function getFolder() {
  var it = DriveApp.getFoldersByName(FOLDER_NAME);
  if (it.hasNext()) return it.next();
  return DriveApp.createFolder(FOLDER_NAME);
}

function uploadFile(p) {
  var bytes = Utilities.base64Decode(p.dataBase64);
  var blob = Utilities.newBlob(bytes, p.mimeType || "application/octet-stream", p.fileName);
  var file = getFolder().createFile(blob);
  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (err) { /* si la organización lo bloquea, queda accesible por la carpeta */ }

  var tz = "America/Bogota";
  var now = new Date();
  var date = Utilities.formatDate(now, tz, "yyyy-MM-dd");
  var time = Utilities.formatDate(now, tz, "HH:mm");
  var iso = now.toISOString();
  var id = Utilities.getUuid();
  var categoryLabel = p.category === "adicionales" ? "Archivos adicionales" : "Documentos solicitados";

  getSheet().appendRow([
    date, time, p.user, p.email, p.name, p.description,
    p.fileName, p.fileType, file.getUrl(), categoryLabel, id, iso,
  ]);

  return {
    id: id, date: date, time: time, isoTimestamp: iso,
    user: p.user, email: p.email, name: p.name, description: p.description,
    fileName: p.fileName, fileType: p.fileType, url: file.getUrl(),
    category: p.category === "adicionales" ? "adicionales" : "solicitados",
  };
}

function listRecords() {
  var data = getSheet().getDataRange().getValues();
  var out = [];
  for (var i = 1; i < data.length; i++) {
    var r = data[i];
    if (!r[10]) continue; // sin id → fila incompleta
    out.push({
      date: r[0], time: r[1], user: r[2], email: r[3], name: r[4], description: r[5],
      fileName: r[6], fileType: r[7], url: r[8],
      category: String(r[9]).toLowerCase().indexOf("adicional") >= 0 ? "adicionales" : "solicitados",
      id: r[10], isoTimestamp: r[11],
    });
  }
  out.sort(function (a, b) { return a.isoTimestamp < b.isoTimestamp ? 1 : -1; });
  return out;
}

function deleteRecord(id) {
  var sh = getSheet();
  var data = sh.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][10]) === String(id)) {
      try {
        var m = String(data[i][8]).match(/[-\w]{25,}/); // id de Drive dentro de la URL
        if (m) DriveApp.getFileById(m[0]).setTrashed(true);
      } catch (err) { /* si no se puede borrar el archivo, igual quitamos la fila */ }
      sh.deleteRow(i + 1);
      return { ok: true };
    }
  }
  return { ok: false, error: "No encontrado." };
}

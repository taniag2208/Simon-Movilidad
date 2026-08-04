/**
 * Evidence Engine · Backend Apps Script para Simón Movilidad
 * ---------------------------------------------------------------------------
 * Guarda el archivo en una carpeta de Drive y registra una fila legible en la
 * hoja "Historial". Columnas visibles (limpias):
 *   Fecha · Hora · Usuario · Correo · Documento / Insumo · Descripción ·
 *   Archivo · Tipo · Enlace
 * (No se guardan columnas técnicas de categoría, id ni marca de tiempo ISO.)
 * ---------------------------------------------------------------------------
 */

// Token de seguridad — debe coincidir con el del portal.
var TOKEN = "kVr2uUTJf2Ny6AosEleEWZkHHPZFj4X5";

var SHEET_NAME = "Historial";
var FOLDER_NAME = "Evidence Engine · Archivos Simón Movilidad";
var HEADERS = [
  "Fecha", "Hora", "Usuario", "Correo", "Documento / Insumo",
  "Descripción", "Archivo", "Tipo", "Enlace",
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
  }
  // Asegura los encabezados limpios en la fila 1.
  var first = sh.getRange(1, 1).getValue();
  if (first !== HEADERS[0]) {
    sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sh.setFrozenRows(1);
  }
  return sh;
}

function getFolder() {
  var it = DriveApp.getFoldersByName(FOLDER_NAME);
  if (it.hasNext()) return it.next();
  return DriveApp.createFolder(FOLDER_NAME);
}

function driveIdFromUrl(url) {
  var m = String(url).match(/[-\w]{25,}/);
  return m ? m[0] : "";
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
  var url = file.getUrl();

  // Fila legible (9 columnas).
  getSheet().appendRow([
    date, time, p.user, p.email, p.name, p.description, p.fileName, p.fileType, url,
  ]);

  // El portal necesita estos campos en memoria (no se guardan en la hoja).
  return {
    id: file.getId(),
    date: date, time: time, isoTimestamp: date + "T" + time,
    user: p.user, email: p.email, name: p.name, description: p.description,
    fileName: p.fileName, fileType: p.fileType, url: url,
    category: p.category === "adicionales" ? "adicionales" : "solicitados",
  };
}

function listRecords() {
  var data = getSheet().getDataRange().getValues();
  var out = [];
  for (var i = 1; i < data.length; i++) {
    var r = data[i];
    var url = r[8];
    if (!url) continue;
    out.push({
      date: r[0], time: r[1], user: r[2], email: r[3], name: r[4],
      description: r[5], fileName: r[6], fileType: r[7], url: url,
      id: driveIdFromUrl(url) || ("row-" + i),
      isoTimestamp: String(r[0]) + "T" + String(r[1]),
      category: "solicitados", // el portal ajusta según el nombre
    });
  }
  out.sort(function (a, b) { return a.isoTimestamp < b.isoTimestamp ? 1 : -1; });
  return out;
}

function deleteRecord(id) {
  var sh = getSheet();
  var data = sh.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (driveIdFromUrl(data[i][8]) === String(id)) {
      try { DriveApp.getFileById(String(id)).setTrashed(true); } catch (err) {}
      sh.deleteRow(i + 1);
      return { ok: true };
    }
  }
  return { ok: false, error: "No encontrado." };
}

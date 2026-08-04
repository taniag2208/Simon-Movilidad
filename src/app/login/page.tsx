import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LoginForm } from "@/components/auth/LoginForm";

export default async function LoginPage() {
  const user = await getSession();
  if (user) redirect("/inicio");
  return <LoginForm />;
}

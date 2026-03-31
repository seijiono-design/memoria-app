"use client";

import { useRouter } from "next/navigation";
import { AuthScreen } from "@/components/memoria/auth-screen";

export default function LoginPage() {
  const router = useRouter();
  return <AuthScreen onContinue={() => router.push("/protected")} />;
}
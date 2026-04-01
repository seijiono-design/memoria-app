"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // PKCE flow: exchange the authorization code for a session
        const code = new URLSearchParams(window.location.search).get("code");
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) console.error("Auth callback error:", error.message);
        }
      } catch (err) {
        console.error("Callback handler error:", err);
      }
      router.replace("/protected");
    };

    handleCallback();
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        color: "#64748b",
        fontSize: "14px",
      }}
    >
      Signing in…
    </div>
  );
}

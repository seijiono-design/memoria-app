"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthScreen } from "@/components/memoria/auth-screen";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  // Redirect already-authenticated users straight to the app
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace("/protected");
    });
  }, [router]);

  const handleContinue = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Request Google Calendar access alongside basic profile
        scopes: "https://www.googleapis.com/auth/calendar",
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent", // always show consent screen so we get refresh_token
        },
      },
    });

    if (error) console.error("OAuth initiation error:", error.message);
  };

  return <AuthScreen onContinue={handleContinue} />;
}

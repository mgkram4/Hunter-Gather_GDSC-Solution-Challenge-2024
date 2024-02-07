"use client";

import { ROUTES } from "@/src/config/routes";
import { createClient } from "@utils/supabase/client";
import { useRouter } from "next/navigation";
import { useAuth } from "@utils/hooks/auth-hook";
import { useEffect } from "react";

export default function MainProfilePage() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      const user = await useAuth(router);

      if (!user || !user.user || !user.user.email) {
        console.log("No user email found, redirecting to sign in.");
        router.push(ROUTES.SIGNIN);
        return;
      }

      const email = user.user.email;

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !data) {
        router.push(ROUTES.SIGNIN);
      } else {
        router.push(ROUTES.PROFILE + "/" + data?.id);
      }
    }
    fetchProfile();
  });

  return <div>Loading profile...</div>;
}

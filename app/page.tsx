"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/types/lib/supabaseClient";
import { useRouter } from "next/navigation";
import AuthButton from "./components/AuthButton";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) return null;

  return (
    <div className="flex h-screen items-center justify-center">
      <AuthButton />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/types/lib/supabaseClient";
import { useRouter } from "next/navigation";
import BookmarkForm from "../components/BookmarkForm";
import BookmarkList from "../components/BookmarkList";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/");
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          router.push("/");
        } else if (event === "SIGNED_IN") {
          setUser(session?.user ?? null);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="text-center mt-20">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">My Bookmarks</h1>
        <button
          onClick={logout}
          className="text-red-500 font-semibold hover:text-red-700 transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Bookmark Form */}
      <BookmarkForm user={user} />

      {/* Bookmark List */}
      <BookmarkList user={user} />
    </div>
  );
}

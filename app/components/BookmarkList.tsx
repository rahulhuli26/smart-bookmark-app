"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/types/lib/supabaseClient";

export default function BookmarkList({ user }: any) {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    if (!user?.id) return;

    fetchBookmarks(user.id);

    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("🔥 Realtime event:", payload);

          if (payload.eventType === "INSERT") {
            setBookmarks((prev) => [payload.new, ...prev]);
          }

          if (payload.eventType === "DELETE") {
            setBookmarks((prev) =>
              prev.filter((bm) => bm.id !== payload.old.id)
            );
          }

          if (payload.eventType === "UPDATE") {
            setBookmarks((prev) =>
              prev.map((bm) => (bm.id === payload.new.id ? payload.new : bm))
            );
          }
        }
      )
      .subscribe((status) => {
        console.log("Realtime status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const fetchBookmarks = async (userId: string) => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  if (!bookmarks.length) {
    return (
      <p className="text-gray-500 mt-4 text-center">
        No bookmarks yet. Add some above!
      </p>
    );
  }

  return (
    <div className="mt-6 w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Your Bookmarks
      </h2>

      <ul className="space-y-3">
        {bookmarks.map((bm) => (
          <li
            key={bm.id}
            className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 hover:shadow-md transition-shadow"
          >
            <a
              href={bm.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-medium hover:underline break-all"
            >
              {bm.title}
            </a>
            <button
              onClick={() => deleteBookmark(bm.id)}
              className="text-red-500 font-semibold hover:text-red-700 transition-colors cursor-pointer"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { useState } from "react";
import { supabase } from "@/types/lib/supabaseClient";

export default function BookmarkForm({ user }: any) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addBookmark = async () => {
    if (!title || !url) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    const { error } = await supabase.from("bookmarks").insert([
      { title, url, user_id: user.id },
    ]);

    if (error) {
      setError("Something went wrong. Try again.");
    } else {
      setTitle("");
      setUrl("");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Add New Bookmark
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Website Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            col-span-1
            border border-gray-300
            rounded-lg
            px-4 py-2
            focus:ring-2 focus:ring-green-500
            focus:outline-none
            transition
          "
        />

        {/* URL Input */}
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="
            col-span-1
            border border-gray-300
            rounded-lg
            px-4 py-2
            focus:ring-2 focus:ring-green-500
            focus:outline-none
            transition
          "
        />

        {/* Button */}
        <button
          onClick={addBookmark}
          disabled={loading}
          className="
            col-span-1
            bg-green-600
            text-white
            font-medium
            rounded-lg
            px-4 py-2
            hover:bg-green-700
            active:scale-[0.98]
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition-all
            cursor-pointer
          "
        >
          {loading ? "Adding..." : "Add Bookmark"}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-3">
          {error}
        </p>
      )}
    </div>
  );
}

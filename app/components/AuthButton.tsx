"use client";

import { supabase } from "@/types/lib/supabaseClient";

export default function AuthButton() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <button
      onClick={login}
      className="
        flex items-center justify-center gap-3
        w-full max-w-sm
        bg-white
        border border-gray-300
        text-gray-700
        font-medium
        px-6 py-3
        rounded-lg
        shadow-sm
        hover:shadow-md
        hover:bg-gray-50
        active:scale-[0.98]
        transition-all duration-200
      "
    >
      {/* Google Logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="w-5 h-5"
      >
        <path
          fill="#FFC107"
          d="M43.611 20.083H42V20H24v8h11.303C33.659 33.907 29.239 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.061 0 5.87 1.154 8.007 3.061l5.657-5.657C33.659 6.053 29.067 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"
        />
        <path
          fill="#FF3D00"
          d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 12 24 12c3.061 0 5.87 1.154 8.007 3.061l5.657-5.657C33.659 6.053 29.067 4 24 4c-7.728 0-14.436 4.435-17.694 10.691z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.187 0 9.89-1.977 13.41-5.205l-6.191-5.238C29.158 35.091 26.715 36 24 36c-5.217 0-9.617-2.066-11.977-4.905l-6.522 5.027C9.686 41.305 16.325 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.611 20.083H42V20H24v8h11.303c-1.17 3.341-4.408 5.739-8.303 5.739-5.217 0-9.617-2.066-11.977-4.905l-6.522 5.027C9.686 41.305 16.325 44 24 44c11.045 0 20-8.955 20-20 0-1.341-.138-2.651-.389-3.917z"
        />
      </svg>

      Continue with Google
    </button>
  );
}

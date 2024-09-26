"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { logout } from "../../../actions/actions";

export default function Logout() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <div onClick={handleLogout}>
      <Button
        className="mr-4 text-gray-400 flex justify-center items-center"
        variant="outline"
        disabled={loading}
      >
        {loading ? (
          <div className="flex space-x-2 justify-center items-center dark:invert mr-[11px]">
            <span className="sr-only">Loading...</span>
            <div className="h-2 w-2 bg-white bg-opacity-60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 bg-white bg-opacity-60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 bg-white bg-opacity-60 rounded-full animate-bounce"></div>
          </div>
        ) : (
          "Çıkış Yap"
        )}
      </Button>
    </div>
  );
}

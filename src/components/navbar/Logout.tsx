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
      <Button className="mr-4 text-gray-400" variant="outline">
        {loading ? (
          <div className="flex space-x-2 justify-center items-center dark:invert">
            <span className="sr-only">Loading...</span>
            <div className="h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-3 w-3 bg-white rounded-full animate-bounce"></div>
          </div>
        ) : (
          "Çıkış yap"
        )}
      </Button>
    </div>
  );
}

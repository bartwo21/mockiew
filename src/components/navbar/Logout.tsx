"use client";

import React from "react";
import { Button } from "../ui/button";
import { logout } from "../../../actions/actions";

export default function Logout() {
  return (
    <div onClick={() => logout()}>
      <Button className="mr-4 text-gray-400" variant="outline">
        Çıkış Yap
      </Button>
    </div>
  );
}

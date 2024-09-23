"use client";

import React from "react";
import { Button } from "../ui/button";
import { logout } from "../../../actions/actions";

export default function Logout() {
  return (
    <div onClick={() => logout()}>
      <Button className="mr-4 text-white" variant="outline">
        Çıkış Yap
      </Button>
    </div>
  );
}

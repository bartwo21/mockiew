import { LoadingSpinner } from "@/helpers/loadingSpinner";
import React from "react";

export default function loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoadingSpinner />
    </div>
  );
}

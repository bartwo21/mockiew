import { LoadingSpinner } from "@/helpers/loadingSpinner";
import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpinner />
    </div>
  );
}

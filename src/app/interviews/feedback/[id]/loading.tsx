import { LoadingSpinner } from "@/helpers/loadingSpinner";
import React from "react";

export default function loading() {
  return (
    <div className="flex flex-col items-center justify-center my-auto h-[80vh]">
      <LoadingSpinner />
    </div>
  );
}

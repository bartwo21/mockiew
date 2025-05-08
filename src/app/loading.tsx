import { LoadingSpinner } from "@/helpers/loadingSpinner";
import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center items-center my-auto h-[80vh]">
      <LoadingSpinner />
    </div>
  );
}

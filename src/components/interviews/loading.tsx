import React from "react";
import { SkeletonLoading } from "../skeletonLoading/skeleteonLoading";

export default function InterviewsLoading() {
  return (
    <div className="flex justify-start gap-3 items-center w-full flex-wrap md:flex-row flex-col">
      {Array.from({ length: 4 }).map((_, index) => (
        <SkeletonLoading key={index} />
      ))}
    </div>
  );
}

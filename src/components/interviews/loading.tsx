import React from "react";
import { SkeletonLoading } from "../skeletonLoading/skeleteonLoading";

export default function InterviewsLoading() {
  return (
    <div className="flex justify-start gap-7 items-center w-full">
      {Array.from({ length: 4 }).map((_, index) => (
        <SkeletonLoading key={index} />
      ))}
    </div>
  );
}

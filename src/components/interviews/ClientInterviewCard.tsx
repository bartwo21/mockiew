/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { deleteInterview } from "../../../actions/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ClientInterviewCard({ interview }: any) {
  const [loading, setLoading] = useState(false);
  const formattedDate = new Date(interview.createdAt).toLocaleDateString(
    "tr-TR",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      setLoading(true);
      await deleteInterview(interview.id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-full">
      <Link href={`/interviews/feedback/${interview.id}`} passHref>
        <div className="group h-full bg-stone-950/50 border border-gray-800/40 bg-opacity-65 hover:border-green-950 hover:border-opacity-60 transition-all duration-500 px-8 pt-6 pb-6 rounded-lg overflow-hidden flex flex-col justify-between">
          <div>
            <h2 className="tracking-widest text-[10px] title-font font-medium text-gray-500 mb-1">
              {interview.status.charAt(0).toUpperCase() +
                interview.status.slice(1)}
            </h2>
            <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3 line-clamp-2">
              {interview.jobTitle.charAt(0).toUpperCase() +
                interview.jobTitle.slice(1)}
            </h1>
          </div>
          <div>
            <a className="text-primary inline-flex items-center">
              Detaylar
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <div className="text-center mt-2 leading-none flex justify-end flex-wrap gap-3">
              <p className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm border-r pr-4 border-opacity-15 border-gray-200">
                {formattedDate}
              </p>
              <Button
                onClick={handleDelete}
                className="text-gray-400 inline-flex items-center leading-none text-sm hover:text-red-500"
                variant="outline"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center items-center dark:invert pr-2 pl-1">
                    <span className="sr-only">Loading...</span>
                    <div className="h-[2px] w-[2px] ml-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-[2px] w-[2px] ml-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-[2px] w-[2px] ml-1 bg-white rounded-full animate-bounce"></div>
                  </div>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 mr-1"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 4H8l-7 7v9a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
                      <line x1="18" y1="2" x2="18" y2="6"></line>
                      <line x1="12" y1="2" x2="12" y2="6"></line>
                    </svg>
                    Sil
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

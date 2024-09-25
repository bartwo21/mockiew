/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BsFillArrowRightSquareFill } from "react-icons/bs";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteInterview } from "../../../actions/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ClientInterviewCard({ interview }: any) {
  const [laoding, setLoading] = useState(false);
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
    <Link
      href={`/interviews/feedback/${interview.id}`}
      passHref
      className="group xl:max-w-[340px] md:max-w-[31%] sm:min-w-44 w-full shadow-zinc-900 shadow-md rounded-xl border hover:border-gray-700 transition-all duration-300 ease-in-out"
    >
      <Card>
        <CardHeader>
          <CardTitle className="truncate whitespace-nowrap overflow-hidden flex justify-between">
            {interview.jobTitle.charAt(0).toUpperCase() +
              interview.jobTitle.slice(1)}
          </CardTitle>

          <CardDescription>
            {interview.status.charAt(0).toUpperCase() +
              interview.status.slice(1)}
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-between items-center">
          <p className="text-sm opacity-70">{formattedDate}</p>
          <Button
            onClick={handleDelete}
            className="hover:text-red-700 ml-auto mr-2 text-red-200"
            variant="ghost"
            disabled={laoding}
          >
            {laoding ? (
              <>
                <div className="grid w-full place-items-center overflow-x-scroll rounded-lg lg:overflow-visible">
                  <svg
                    className="text-gray-400 animate-spin"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                  >
                    <path
                      d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                      stroke="currentColor"
                      stroke-width="5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                      stroke="currentColor"
                      stroke-width="5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="text-gray-900"
                    ></path>
                  </svg>
                </div>
              </>
            ) : (
              "Sil"
            )}
          </Button>
          <BsFillArrowRightSquareFill className="text-3xl transition-all duration-300 ease-in-out hover:shadow-[0_0_10px_3px_#22c55e4e]" />
        </CardFooter>
      </Card>
    </Link>
  );
}

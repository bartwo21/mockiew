/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";
import { auth } from "@/lib/Auth";
import { getAllInterviews } from "../../../actions/actions";
import InterviewsLoading from "@/components/interviews/loading";
import Link from "next/link";

const ClientInterviewCard = React.lazy(
  () => import("@/components/interviews/ClientInterviewCard")
);

export default async function page() {
  const session = await auth();

  const email = session?.user?.email;
  const interviews = email ? await getAllInterviews(email) : [];

  return (
    <div className="container flex flex-col items-center justify-center p-10 mx-auto">
      <h1 className="text-primary font-bold text-3xl mb-10 w-full text-center">
        MÜLAKATLARIM
        <div>
          <hr className="my-12 h-0.5 border-t-0 bg-neutral-800 dark:bg-white/10" />
        </div>
      </h1>
      <InterviewsLoading />
      {interviews.length === 0 ? (
        <div className="flex items-center justify-center w-full">
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            Henüz bir mülakatınız bulunmamaktadır. Mülakat eklemek için{" "}
            <Link href="/interview">
              <span className="text-primary transition-all hover:text-green-300">
                buraya
              </span>
            </Link>{" "}
            tıklayınız.
          </p>
        </div>
      ) : (
        <Suspense fallback={<InterviewsLoading />}>
          <div className="flex gap-5 items-center justify-start w-full flex-col md:flex-row flex-wrap px-4">
            {interviews.map((interview: any) => (
              <ClientInterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        </Suspense>
      )}
    </div>
  );
}

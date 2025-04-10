/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";
import { auth } from "@/lib/Auth";
import { getAllInterviews } from "../../../actions/actions";
import InterviewsLoading from "@/components/interviews/loading";
import Link from "next/link";
import dynamic from "next/dynamic";

const ClientInterviewCard = dynamic(
  () => import("@/components/interviews/ClientInterviewCard"),
  { ssr: false }
);

export default async function page() {
  const session = await auth();

  const email = session?.user?.email;
  const interviews = email ? await getAllInterviews(email) : [];

  return (
    <div className="flex flex-col items-center justify-center p-10 mx-auto relative h-full w-full bg-transparent">
      <div className="absolute top-0 z-[-2] w-full h-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-35%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
      <h1 className="text-primary text-2xl text-left w-5/6 ml-8">
        Mülakatlarım
        <div>
          <hr className="my-4 h-0.5 border-t-0 bg-neutral-800 dark:bg-white/10" />
        </div>
      </h1>
      {interviews.length === 0 ? (
        <div className="flex items-center justify-center w-full">
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            Henüz bir mülakatınız bulunmamaktadır. Mülakat eklemek için{" "}
            <Link href="/interview">
              <span className="text-primary transition-all hover:text-primary/80">
                buraya
              </span>
            </Link>{" "}
            tıklayınız.
          </p>
        </div>
      ) : (
        <Suspense fallback={<InterviewsLoading />}>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-4 w-5/6">
            {/*  grid ile card height sorunu çözüldü */}
            {interviews.map((interview: any) => (
              <ClientInterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        </Suspense>
      )}
    </div>
  );
}

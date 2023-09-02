import { Skeleton } from "@/components/ui/skeleton";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        {/* @ts-expect-error Server Component */}
        <WelcomeMsg />
      </Suspense>
      {/* <Suspense fallback={<div>Loading collections...</div>}> */}
      {/* <CollectionList /> */}
      {/* </Suspense> */}
    </>
  );
}

async function WelcomeMsg() {
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        Welcome, <br /> {user.firstName} {user.lastName}
      </h1>
    </div>
  );
}

function WelcomeMsgFallback() {
  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        <Skeleton className="w-[180px] h-[36px]" />
        <Skeleton className="w-[150px] h-[36px]" />
      </h1>
    </div>
  );
}

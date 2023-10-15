import CreateCollectionBtn from "@/components/CreateCollectionBtn";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prismadb";
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
      <Suspense fallback={<div>Loading collections...</div>}>
        {/* @ts-expect-error Server Component */}
        <CollectionList />
      </Suspense>
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

async function CollectionList() {
  const user = await currentUser();
  const collections = await prisma.collection.findMany({
    where: {
      userId: user?.id,
    },
  });
  console.log(collections);

  if (collections.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          {/* <SadFace /> */}
          <AlertTitle>There are no collections yet!</AlertTitle>
          <AlertDescription>
            Create a collection to get started
          </AlertDescription>
        </Alert>
        <CreateCollectionBtn />
      </div>
    );
  }

  // return (
  //   <>
  //     {/* <CreateCollectionBtn /> */}
  //     <div className="flex flex-col gap-4 mt-6">
  //       {collections.map((collection) => (
  //         <CollectionCard key={collection.id} collection={collection} />
  //       ))}
  //     </div>
  //   </>
  // );
}

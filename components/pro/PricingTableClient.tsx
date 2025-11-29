"use client";
import { PricingTable } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "../ui/skeleton";

const PricingTableClient = () => {
  const { isLoaded } = useUser();

  return (
    <>
      {!isLoaded && (
        <div className="grid grid-cols-3 gap-6">
          <Skeleton className="h-[300px] w-full"></Skeleton>
          <Skeleton className="h-[300px] w-full"></Skeleton>
          <Skeleton className="h-[300px] w-full"></Skeleton>
        </div>
      )}
      <PricingTable
        appearance={{
          variables: {
            colorBackground: "#eee",
            colorText: "#000",
          },
        }}
      />
    </>
  );
};

export default PricingTableClient;

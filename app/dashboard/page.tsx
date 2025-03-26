import { useUserContext } from "@/context/userContext";
import { UserType } from "@/types/UserType";
import { getServerUser } from "@/util/UserControllers";
import { ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = (await getServerUser()) as UserType;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex items-center gap-3 text-3xl font-semibold">
        <ShieldCheck />
        <p>You hava successfully Loged in</p>
      </div>
      {user.email}
    </div>
  );
};

export default page;

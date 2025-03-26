import { useUserContext } from "@/context/userContext";
import { UserType } from "@/types/UserType";
import { getServerUser } from "@/util/UserControllers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = (await getServerUser()) as UserType;
  if (!user) {
    redirect("/login");
  }
  return <div className="min-h-screen">{user.email}</div>;
};

export default page;

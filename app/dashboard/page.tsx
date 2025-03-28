import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardHeader } from "@/components/ui/card";
import { useUserContext } from "@/context/userContext";
import { UserType } from "@/types/UserType";
import { getServerUser } from "@/util/UserControllers";
import { Info, ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = (await getServerUser()) as UserType;
  if (!user) {
    redirect("/login");
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-10 text-3xl font-semibold">
        <ShieldCheck />
        <p>You have successfully Logged in</p>
        <Alert className="w-1/2">
          <Info className="h-4 w-4" />
          <AlertTitle>API Comming soon</AlertTitle>
          <AlertDescription>
            At the moment this app is demonstration of secure JWT auth with
            registration with email validation, password reset with email
            validation, expiring token which is send to email and can be used
            only once, after usage that token url will be set as expired
          </AlertDescription>
        </Alert>
        <div className="flex text-center flex-col">
          <p>{user.email}</p>
          <p>{user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default page;

"use server";
import { cookies } from "next/headers";
import { decrypt } from "./encryption";
import { UserType } from "@/types/UserType";

export const getServerUser = async () => {
  try {
    const cookieStore = await cookies();
    const encryptedData = cookieStore.get("userData")?.value;

    if (!encryptedData) return null;

    const decrypted = decrypt(encryptedData);
    return JSON.parse(decrypted) as UserType;
  } catch (error) {
    console.error("Server auth error:", error);
    return null;
  }
};

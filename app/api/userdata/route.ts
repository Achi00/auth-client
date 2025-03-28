import { NextRequest, NextResponse } from "next/server";
import { encrypt, decrypt } from "@/util/encryption"; // Adjust the import path as needed
import { cookies } from "next/headers";

// Node.js runtime
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { encryptedData, userData } = await request.json();

    if (userData) {
      // Encrypt the user data
      const encrypted = await encrypt(JSON.stringify(userData));
      return NextResponse.json({ encryptedData: encrypted });
    } else if (encryptedData) {
      // Decrypt the user data
      const decrypted = await decrypt(encryptedData);
      return NextResponse.json({ userData: JSON.parse(decrypted) });
    } else {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing user data:", error);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}

// route hander test
export async function GET() {
  try {
    const cookieStore = await cookies();
    const encryptedData = cookieStore.get("userData")?.value;

    if (!encryptedData) {
      return NextResponse.json({ userData: null }, { status: 401 });
    }

    const decryptedData = await decrypt(encryptedData);
    return NextResponse.json({ userData: JSON.parse(decryptedData) });
  } catch (error) {
    console.error("Error decrypting user data:", error);
    return NextResponse.json({ error: "Decryption failed" }, { status: 500 });
  }
}

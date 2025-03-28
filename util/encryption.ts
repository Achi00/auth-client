function hexToBytes(hex: string): Uint8Array {
  return new Uint8Array(hex.match(/../g)!.map((h) => parseInt(h, 16)));
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const keyPromise = crypto.subtle.importKey(
  "raw",
  hexToBytes(process.env.ENCRYPTION_KEY!),
  { name: "AES-CBC" },
  false,
  ["encrypt", "decrypt"]
);

export async function encrypt(text: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const key = await keyPromise;
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    key,
    new TextEncoder().encode(text)
  );
  return bytesToHex(iv) + ":" + bytesToHex(new Uint8Array(encrypted));
}

export async function decrypt(text: string): Promise<string> {
  const [ivHex, dataHex] = text.split(":");
  const iv = hexToBytes(ivHex);
  const data = hexToBytes(dataHex);
  const key = await keyPromise;
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv },
    key,
    data
  );
  return new TextDecoder().decode(decrypted);
}
// import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

// const algorithm = "aes-256-cbc";
// const key = Buffer.from(process.env.ENCRYPTION_KEY || "", "hex");

// export function encrypt(text: string): string {
//   const iv = randomBytes(16);
//   const cipher = createCipheriv(algorithm, key, iv);
//   let encrypted = cipher.update(text, "utf8", "hex");
//   encrypted += cipher.final("hex");
//   return iv.toString("hex") + ":" + encrypted;
// }

// export function decrypt(text: string): string {
//   const [ivHex, encryptedHex] = text.split(":");
//   const iv = Buffer.from(ivHex, "hex");
//   const decipher = createDecipheriv(algorithm, key, iv);
//   let decrypted = decipher.update(encryptedHex, "hex", "utf8");
//   decrypted += decipher.final("utf8");
//   return decrypted;
// }

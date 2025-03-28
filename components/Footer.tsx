import { Headset, NotepadText, Settings, Shield } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full flex justify-between px-5 items-center border-t py-6">
      <Link href="/" className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        <span className="font-semibold">SecureAuth</span>
      </Link>
      <div className="links">
        <div className="flex gap-6">
          <Link
            href="/auth-api"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <Settings />
            API
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <Headset />
            Contact
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <NotepadText />
            Terms
          </Link>
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} SecureAuth. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

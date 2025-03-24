"use client";
import { LogOutIcon, Shield } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useUserContext } from "@/context/userContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, loading, logout } = useUserContext();
  return (
    <nav className="sticky top-0 z-40 border-b h-16 px-8 py-4 flex justify-between w-full bg-background">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">SecureAuth</span>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="rounded-full w-8 h-8 flex items-center justify-center text-2xl bg-gray-300 p-2">
                <p>{user.name.substring(0, 1).toUpperCase()}</p>
                {/* <p>{user.name}</p> */}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>API</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <div className="w-full border-t-2"></div>
              <DropdownMenuItem onClick={logout}>
                <LogOutIcon />
                <span className="font-semibold">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Login
            </Link>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

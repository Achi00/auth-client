"use client";
import {
  ChevronDown,
  LogOutIcon,
  Settings,
  Shield,
  ShieldUser,
  User,
} from "lucide-react";
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
      <Link href="/" className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">SecureAuth</span>
      </Link>
      <div className="flex items-center gap-4">
        {user && !loading ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 mr-5 border rounded-lg py-2 px-4 cursor-pointer">
              <div className="rounded-full cursor-pointer w-8 h-8 flex items-center justify-center bg-gray-300 p-2">
                <User />
              </div>
              <p className="text-xl">{user.name}</p>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  {user.email && (
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="text-xl">
                <DropdownMenuItem className="text-lg">
                  <Link className="flex gap-3 items-center" href="/profile">
                    <ShieldUser />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-lg">
                  <Link className="flex gap-3 items-center" href="/auth-api">
                    <Settings />
                    API
                  </Link>
                </DropdownMenuItem>
              </div>
              <div className="w-full border-t-2"></div>
              <DropdownMenuItem onClick={logout}>
                <div className="flex gap-2 items-center justify-center text-red-600 text-lg cursor-pointer h-10">
                  <LogOutIcon color="red" />
                  <span className="font-semibold">Log out</span>
                </div>
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

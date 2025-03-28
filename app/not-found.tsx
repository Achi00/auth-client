import { Button } from "@/components/ui/button";
import { UserType } from "@/types/UserType";
import { getServerUser } from "@/util/UserControllers";
import {
  ArrowLeft,
  ArrowRight,
  FileQuestion,
  FileText,
  Home,
  Shield,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFound = async () => {
  const user = (await getServerUser()) as UserType;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center w-full">
      <div className="container flex items-center justify-center py-16 md:py-32">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-primary/10 p-6">
              <FileQuestion className="h-16 w-16 text-primary" />
            </div>
          </div>

          <h1 className="mb-2 text-4xl font-bold tracking-tighter sm:text-5xl">
            Page Not Found
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              {user ? (
                <Link href="/dashboard">
                  View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              ) : (
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              )}
            </Button>
          </div>

          <div className="mt-12 rounded-lg border border-muted p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              Looking for something?
            </h2>
            <p className="mb-4 text-muted-foreground">
              You might find what you need in one of these sections:
            </p>
            <div className="grid gap-2 text-left">
              <Link
                href="/"
                className="flex items-center rounded-md p-2 text-sm hover:bg-muted/50"
              >
                • Home Page - Learn about our authentication services
              </Link>
              {user ? (
                <Link
                  href="/api-docs"
                  className="flex items-center rounded-md p-2 text-sm hover:bg-muted/50"
                >
                  <>
                    • API Docs - See what you can do with{" "}
                    <span className="font-semibold mx-1">SecureAuth</span> API
                  </>
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center rounded-md p-2 text-sm hover:bg-muted/50"
                  >
                    • Login - Access your account
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center rounded-md p-2 text-sm hover:bg-muted/50"
                  >
                    • Register - Create a new account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

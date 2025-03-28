"use client";
import { Suspense, useEffect, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Lock, Mail, RotateCcw, Shield } from "lucide-react";
import Link from "next/link";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useUserContext } from "@/context/userContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface LoginValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginForm() {
  const { user } = useUserContext();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  if (user) {
    redirect("/");
  }

  const emailFromParams = searchParams.get("email");

  useEffect(() => {
    if (emailFromParams) {
      // validate email
      toast.success("Email Autofill completed");
    }
  }, [emailFromParams]);

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        const data = await response.json();
        setError(data.error || "An error occurred during login");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="container flex items-center justify-center py-12 md:py-24">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Sign in
              </h1>
              <p className="text-muted-foreground">
                Access your secure account
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <Formik
                initialValues={{
                  email: emailFromParams ? emailFromParams : "",
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                      </div>
                      <Field
                        as={Input}
                        id="email"
                        // value={emailFromParams || ""}
                        type="email"
                        name="email"
                        placeholder="your.email@example.com"
                        autoComplete="email"
                        className="w-full"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-destructive text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Lock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <label
                          htmlFor="password"
                          className="text-sm font-medium"
                        >
                          Password
                        </label>
                      </div>
                      <Field
                        as={Input}
                        id="password"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className="w-full"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-destructive text-sm"
                      />
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full cursor-pointer"
                    >
                      {isSubmitting ? "Signing in..." : "Sign in"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Forgot Password?
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <Button asChild variant="outline" className="w-full">
                <Link
                  href="/reset"
                  className="flex items-center justify-center"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Password
                </Link>
              </Button>
            </div>

            <div className="text-center">
              <Link
                href="/register"
                className="text-sm font-semibold text-black hover:text-foreground"
              >
                Don't have an account? Create one
              </Link>
            </div>

            <div className="text-center text-xs text-muted-foreground">
              By continuing, you agree to{" "}
              <span className="font-bold">SecureAuth</span>
              <br />
              <Link href="/terms" className="hover:text-foreground">
                Terms of Service
              </Link>
              ,{" "}
              <Link href="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

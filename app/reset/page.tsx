"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LogIn,
  MailCheck,
  Send,
  Shield,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userContext";

interface ResetValues {
  email: string;
}

const ResetSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const { user } = useUserContext();

  const router = useRouter();

  if (user) {
    router.push("/");
  }

  const handleSubmit = async (
    values: ResetValues,
    { setSubmitting }: FormikHelpers<ResetValues>
  ) => {
    try {
      setEmailSent(false);
      const response = await fetch("/api/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setEmailSent(true);
        setError(null);
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (err) {
      setError("An error occurred during sending email");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen flex-col bg-background">
      <div className="container flex items-center justify-center py-12 md:py-24">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Reset your password
            </h1>
            <p className="text-muted-foreground">
              Enter your email and we'll send you a password recovery link
            </p>
          </div>

          {emailSent ? (
            <>
              <Alert className="w-full">
                <AlertTitle className="flex items-center gap-2">
                  <MailCheck className="h-5 w-5" />
                  Please Check Your Email
                </AlertTitle>
                <AlertDescription className="ml-2 mt-2">
                  We've sent a password reset link to your email. Please follow
                  the instructions to reset your password.
                </AlertDescription>
              </Alert>
            </>
          ) : (
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <Formik
                initialValues={{
                  email: "",
                }}
                validationSchema={ResetSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4 flex flex-col gap-2">
                    <div className="space-y-2 flex flex-col gap-1">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email address
                      </label>
                      <Field
                        as={Input}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="your.email@example.com"
                        className="w-full"
                      />
                      <ErrorMessage
                        name="email"
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
                      className="w-full  cursor-pointer"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Send className="h-4 w-4" />
                          <span>Send Reset Link</span>
                        </div>
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Already have an account?
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <Button asChild variant="outline" className="w-full">
              <Link href="/login" className="flex items-center justify-center">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
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
  );
}

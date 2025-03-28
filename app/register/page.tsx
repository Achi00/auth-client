"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/userContext";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import {
  AlertCircle,
  Lock,
  LogIn,
  LogInIcon,
  Mail,
  MailCheck,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

interface RegisterValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().min(6, "Too short").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password does not match"),
});

const page = () => {
  const [error, setError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState<string>("");
  const { user, loading } = useUserContext();

  const router = useRouter();

  if (user) {
    router.push("/");
  }

  const handleSubmit = async (
    values: RegisterValues,
    { setSubmitting }: FormikHelpers<RegisterValues>
  ) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setIsRegistered(true);
        setEmail(values.email);
        toast.success("User registered seccesfully");
      } else {
        const data = await response.json();
        console.log(data);
        setError(data.error || "An error occurred during login");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNavigate = () => {
    // navigate to /login page auto fill email field
    if (email !== "") {
      router.push(`/login?email=${email}`);
    } else {
      router.push("/login");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="container flex items-center justify-center py-12 md:py-24">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Register with SecuteAuth
            </h1>
            <p className="text-muted-foreground">Access your secure account</p>
          </div>
          {isRegistered && (
            <Alert>
              <MailCheck className="h-4 w-4" />
              <AlertTitle>Email Registered</AlertTitle>
              <AlertDescription className="flex flex-col">
                <p>
                  Please check your inbox and verify your email address to
                  complete the registration process.
                </p>
                <Button
                  onClick={handleNavigate}
                  className="self-end cursor-pointer text-black"
                  variant="outline"
                >
                  <LogIn />
                  Log In
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={registerSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                    </div>
                    <Field
                      as={Input}
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-destructive text-sm"
                    />
                  </div>

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
                      <label htmlFor="password" className="text-sm font-medium">
                        Password
                      </label>
                    </div>
                    <Field
                      as={Input}
                      id="password"
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-destructive text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Lock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium"
                      >
                        Confirm Password
                      </label>
                    </div>
                    <Field
                      as={Input}
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="confirmPassword"
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
                    {isSubmitting ? "Creating account..." : "Create Account"}
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
                Already Have Account?
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <Button asChild variant="outline" className="w-full">
              <Link href="/login" className="flex items-center justify-center">
                <LogInIcon className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          </div>

          <div className="text-center">
            <Link
              href="/register"
              className="text-sm text-muted-foreground hover:text-foreground"
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
  );
};

export default page;

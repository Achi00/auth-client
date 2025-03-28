import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { UserType } from "@/types/UserType";
import { getServerUser } from "@/util/UserControllers";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Info,
  Lock,
  Mail,
  RefreshCw,
  Settings,
  Terminal,
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const user = (await getServerUser()) as UserType;
  return (
    <div className="flex min-h-screen flex-col w-full items-center">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32">
          <div className="w-full flex justify-center pb-12">
            <Alert className="w-1/3">
              <Info className="h-4 w-4" />
              <AlertTitle>API Comming soon</AlertTitle>
              <AlertDescription>
                API Is under development, current version of app demonstrates
                capabilities of registration, authentication, password reset,
                email verification and more.
              </AlertDescription>
            </Alert>
          </div>
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Secure Authentication Made Simple
                </h1>
                <p className="text-xl text-muted-foreground">
                  Robust JWT-based authentication system with email verification
                  and secure password reset.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                {user ? (
                  <>
                    <Button asChild size="lg">
                      <Link href="/dashboard">
                        View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg">
                      <Link href="/api-docs" className="flex item-center gap-2">
                        <FileText />
                        Check API Docs
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild size="lg">
                      <Link href="/register">
                        Create Account <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg">
                      <Link href="/login">Sign In</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-[350px] rounded-lg border bg-background p-4 shadow-lg">
                <div className="space-y-4 p-4">
                  <div className="text-xl font-bold text-primary">
                    JWT Authentication
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Secure email-based authentication with no third-party
                      providers
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Email validation required for account activation
                    </p>
                  </div>
                  <div className="flex flex-col space-y-4 pt-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        className="w-full rounded-md border px-3 py-1 text-sm"
                        disabled
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Lock className="h-5 w-5 text-primary" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full rounded-md border px-3 py-1 text-sm"
                        disabled
                      />
                    </div>
                    <button className="mt-2 w-full rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground">
                      Sign In Securely
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-16 md:py-24">
          <div className="mx-auto text-center md:w-1/2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Key Features
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our authentication system provides enterprise-grade security with
              a seamless user experience.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">JWT Authentication</h3>
              <p className="text-muted-foreground">
                Email and password authentication using secure JWT tokens
                without relying on third-party providers.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Email Verification</h3>
              <p className="text-muted-foreground">
                Special encrypted tokens sent to users' emails ensure account
                validation before allowing login.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Secure Password Reset</h3>
              <p className="text-muted-foreground">
                Secure password reset via encrypted tokens sent to verified
                email addresses with a dedicated reset form.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-muted/50 py-16 px-5 rounded-2xl md:py-24">
          <div className="container">
            <div className="mx-auto text-center md:w-1/2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our authentication process is designed to be both secure and
                user-friendly.
              </p>
            </div>
            <div className="mt-16 space-y-12">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                  <h3 className="text-2xl font-bold">1. User Registration</h3>
                  <p className="text-muted-foreground">
                    Users register with their email and password. We never store
                    passwords in plain text.
                  </p>
                </div>
                <div className="rounded-lg border bg-background p-6 shadow-sm">
                  <div className="space-y-4">
                    <div className="font-medium">Create Account</div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Enter your email address
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Create a secure password
                        </span>
                      </div>
                    </div>
                    <button className="w-full rounded-md bg-primary/80 py-2 text-sm font-medium text-primary-foreground">
                      Register
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2 md:flex-row-reverse">
                <div className="flex flex-col justify-center space-y-4 md:order-2">
                  <h3 className="text-2xl font-bold">2. Email Verification</h3>
                  <p className="text-muted-foreground">
                    A secure encrypted token is sent to the user's email.
                    Clicking the link validates their account.
                  </p>
                </div>
                <div className="rounded-lg border bg-background p-6 shadow-sm md:order-1">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <div className="font-medium">Verification Email</div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">
                        Please verify your email address to activate your
                        account.
                      </p>
                      <p className="text-sm">
                        We've sent a secure encrypted token to your email.
                      </p>
                    </div>
                    <button className="rounded-md bg-primary/80 px-4 py-2 text-sm font-medium text-primary-foreground">
                      Verify Email
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                  <h3 className="text-2xl font-bold">
                    3. Secure Authentication
                  </h3>
                  <p className="text-muted-foreground">
                    After verification, users can log in securely with JWT
                    tokens managing their session.
                  </p>
                </div>
                <div className="rounded-lg border bg-background p-6 shadow-sm">
                  <div className="space-y-4">
                    <div className="font-medium">Secure Login</div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Enter your verified email
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Enter your password</span>
                      </div>
                    </div>
                    <button className="w-full rounded-md bg-primary/80 py-2 text-sm font-medium text-primary-foreground">
                      Login with JWT
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid gap-8 md:grid-cols-2 md:flex-row-reverse">
                <div className="flex flex-col justify-center space-y-4 md:order-2">
                  <h3 className="text-2xl font-bold">4. Reset Password</h3>
                  <p className="text-muted-foreground">
                    A secure encrypted token is sent to the user's email. By
                    clicking you will be redirected to password reset page,
                    token can be used only once.
                  </p>
                </div>
                <div className="rounded-lg border bg-background p-6 shadow-sm md:order-1">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <div className="font-medium">Forgot Password?</div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">
                        Please open token url we send you on email. After that
                        you will be redirected to reset form
                      </p>
                      <p className="text-sm">
                        Token url will be valid for only one use, after that it
                        will be set as expired.
                      </p>
                    </div>
                    <button className="rounded-md bg-primary/80 px-4 py-2 text-sm font-medium text-primary-foreground">
                      Reset password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-16 px-5 rounded-2xl md:py-24">
          <div className="rounded-lg bg-primary/5 p-8 md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Create your account now and experience our secure authentication
                system.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg">
                  <Link href="/register">Create Account</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

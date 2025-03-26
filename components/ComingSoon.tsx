import { Construction } from "lucide-react";

import { Button } from "./ui/button";
import Link from "next/link";

const ComingSoon = () => {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col bg-background">
      <main className="flex-1">
        <div className="container py-12 md:py-24">
          <div className="mx-auto max-w-3xl space-y-10">
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4">
                <Construction className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                API Coming Soon
              </h1>
              <p className="text-xl text-muted-foreground">
                Our API is currently under development and will be available
                soon.
              </p>
              <Button variant="outline">
                <Link href="/">Go Back</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComingSoon;

import { Shield, Lock } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="h-16 w-16 text-primary animate-pulse" />
          </div>
          <svg
            className="h-20 w-20 animate-spin text-primary/20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Securing Your Session</h2>
          <p className="text-muted-foreground">Loading...</p>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
        </div>

        <div className="mt-8 flex items-center justify-center space-x-1 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" />
          <span>End-to-end encrypted</span>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { login } from "@/services/auth"; 
import  { signup }  from "@/services/auth"; 
import { startDemo } from "@/services/auth";
import { useRouter } from "next/router"; 
import AuthForm from "@/components/AuthForm";
import Button from "@/components/Button";

export default function SignUpLoginPage() {
  const router = useRouter(); 
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [demoError, setDemoError] = useState<string | null>(null);

const handleLogin = async(email: string, password: string) => {
    await login(email, password);
    router.push('/dashboard');
}

const handleSignup = async(email: string, password: string) => {
    await signup(email, password);
    router.push('/dashboard'); // consider changing to a more in depth signup page later
}

const handleDemo = async() => {
    setIsDemoLoading(true);
    setDemoError(null);

    // no finally here (unlike AuthForm): on success the button should stay disabled while we go to the dashboard
    try {
        await startDemo();
        router.push('/dashboard');
    } catch(error) {
        setDemoError(error instanceof Error ? error.message : 'An unexpected error occurred');
        setIsDemoLoading(false);
    }
}

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-6 px-4 py-8">
      <h1 className="text-3xl font-bold">QuoteMe</h1>
      <AuthForm
        onLogin={handleLogin}
        onSignup={handleSignup}
        className="w-full max-w-sm flex flex-col gap-4"
      />

      {/* "or" divider between the login form and the demo button */}
      <div className="w-full max-w-sm flex items-center gap-3">
        <div className="flex-1 border-t border-border"></div>
        <span className="text-sm text-muted-foreground">or</span>
        <div className="flex-1 border-t border-border"></div>
      </div>

      {demoError && (
        <p className="w-full max-w-sm text-sm text-error bg-error/10 rounded-md px-3 py-2">{demoError}</p>
      )}

      <Button
        onClick={handleDemo}
        disabled={isDemoLoading}
        className="w-full max-w-sm"
      >
        {isDemoLoading ? 'Loading...' : 'Try the demo'}
      </Button>
    </main>
  );
}

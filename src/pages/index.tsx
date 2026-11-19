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
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* left side: what QuoteMe is, and the demo button */}
      <section className="flex flex-col gap-6">
        <h1 className="font-serif text-5xl sm:text-6xl font-medium leading-[1.05] tracking-tight text-foreground">
          Keep the words that <em className="text-accent-2">stay with you.</em>
        </h1>
        <p className="text-lg text-foreground-secondary max-w-md">Save quotes, tag them, and add your own notes.</p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Button
            onClick={handleDemo}
            disabled={isDemoLoading}
            className="w-full sm:w-auto"
          >
            {isDemoLoading ? 'Loading...' : 'Try the demo'}
          </Button>
          <span className="text-sm text-muted-foreground text-center sm:text-left">No sign-up needed</span>
        </div>

        {demoError && (
          <p className="max-w-md text-sm text-error bg-error/10 rounded-md px-3 py-2">{demoError}</p>
        )}

        {/* a sample card so visitors can see what a saved quote looks like (hidden on phones to keep the page short) */}
        <figure className="hidden lg:block mt-6 max-w-md bg-background-secondary border border-border rounded-2xl shadow-sm p-6">
          <blockquote className="border-l-2 border-accent-2 pl-4 font-serif text-xl leading-relaxed text-foreground">
            “Well done is better than well said.”
          </blockquote>
          <figcaption className="mt-3 pl-4 text-xs uppercase tracking-widest text-muted-foreground">Benjamin Franklin</figcaption>
        </figure>
      </section>

      {/* right side: log in or sign up */}
      <section className="w-full max-w-md mx-auto lg:mr-0 bg-background-secondary border border-border rounded-2xl shadow-sm p-6 sm:p-8">
        <AuthForm
          onLogin={handleLogin}
          onSignup={handleSignup}
          className="flex flex-col gap-4"
          initialMode={router.query.mode === 'signup' ? 'signup' : 'login'}
        />
      </section>
    </main>
  );
}

import React from "react";
import { login } from "@/services/auth"; 
import  { signup }  from "@/services/auth"; 
import { useRouter } from "next/router"; 
import AuthForm from "@/components/AuthForm";

export default function SignUpLoginPage() {
  const router = useRouter(); 

const handleLogin = async(email: string, password: string) => {
    await login(email, password);
    router.push('/dashboard');
}

const handleSignup = async(email: string, password: string) => {
    await signup(email, password);
    router.push('/dashboard'); // consider changing to a more in depth signup page later
}

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-6 px-4 py-8">
      <h1 className="text-3xl font-bold">QuoteMe</h1>
      <AuthForm
        onLogin={handleLogin}
        onSignup={handleSignup}
        className="w-full max-w-sm flex flex-col gap-4"
      />
    </main>
  );
}

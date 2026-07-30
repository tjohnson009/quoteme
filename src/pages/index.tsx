import React from "react";
import { login } from "@/services/auth"; 
import  { signup }  from "@/services/auth"; 
import { useRouter } from "next/router"; 
import AuthForm from "@/components/AuthForm";

export default function SignUpLoginPage() {
  const router = useRouter(); 

const handleLogin = async(email: string, password: string) => {
    try { 
      await login(email, password); 
      router.push('/dashboard'); 
    } catch(error) {
      console.error("Login failed:", error);
    } 
}

const handleSignup = async(email: string, password: string) => {
try {  
  await signup(email, password); 
  router.push('/dashboard'); // consider changing to a more in depth signup page later
}
catch (error) {
  console.error("Signup failed:", error);
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
    </main>
  );
}

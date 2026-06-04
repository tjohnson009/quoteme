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
      console.log('Logged in as ', email);
      router.push('/dashboard'); 
    } catch(error) {
      console.error("Login failed:", error);
    } 
}

const handleSignup = async(email: string, password: string) => {
try {  
  await signup(email, password); 
  console.log('Signed up as ', email);
  router.push('/dashboard'); // consider changing to a more in depth signup page later
}
catch (error) {
  console.error("Signup failed:", error);
}
}

  return (
    <>
      <main className="py-2 gap-[1/4] w-full items-center m-0 mx-auto sm:items-start border-blue-500 border-1">
         <p className="mt-2">QuoteMe</p>
    <AuthForm
      onLogin={handleLogin}
      onSignup={handleSignup}
      className="max-w-[320px] w-3/4 mx-auto flex flex-col gap-[2vh] my-2"
       ></AuthForm>
      </main>
      </>
  );
}

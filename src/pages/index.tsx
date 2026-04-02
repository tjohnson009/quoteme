import React from "react";
// import { Geist, Geist_Mono } from "next/font/google";
import {login} from "@/services/auth"; 
import  {signup}  from "@/services/auth"; 
import { useRouter } from "next/router"; 
// import Button from "@/components/Button";
import AuthForm from "@/components/AuthForm";
import Footer from "@/components/Footer"; 
import Navbar from "@/components/Navbar";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function SignUpLoginPage() {
  const router = useRouter(); 

const handleLogin = async(email: string, password: string) => {
    try { 
      await login(email, password); 
      console.log('Logged in as as ', email);
      // Redirect or show success message 
      router.push('/dashboard'); // Redirect to dashboard after login is successful
    } catch(error) {
      console.error("Login failed:", error);
    } 
}

const handleSignup = async(email: string, password: string) => {
try {  
  await signup(email, password); 
  console.log('Signed up as ', email);
  // Redirect or show success message
  router.push('/dashboard'); // consider changing to a more in depth signup page later
}
catch (error) {
  console.error("Signup failed:", error);
}
}

  return (
    // <div className={`grid border-1 border-solid border-red-500 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}
    // >
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
    // </div>
  );
}

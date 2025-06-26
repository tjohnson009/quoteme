import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import {login} from "@/services/auth"; 
import  {signup}  from "@/services/auth"; 
// import Button from "@/components/Button";
import AuthForm from "@/components/AuthForm";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const handleLogin = async(email: string, password: string) => {
    try { await login(email, password); } 
    catch (error) {
      console.error("Login failed:", error);
    } 
}

const handleSignup = async(email: string, password: string) => {
try {  await signup(email, password); 
}
catch (error) {
  console.error("Signup failed:", error);
}
}

export default function Home() {
  return (
    <div className={`${geistSans.className} ${geistMono.className} grid border-1 border-solid border-red-500 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-[32px] max-w-1/2 row-start-2 items-center sm:items-start">
         QuoteMe
    <AuthForm
      onLogin={handleLogin}
      onSignup={handleSignup}
    ></AuthForm>
        {/* <div className="flex gap-4 items-center flex-col sm:flex-row"> */}
          {/* <Button
          onClick={() => {
            // window.location.href = "/login";
          }}
          >Log In</Button>
          <Button
          onClick={() => {
            // window.location.href = "/signup";
          }}
          >Sign Up</Button> */}
        {/* </div> */}
      </main>
    </div>
  );
}

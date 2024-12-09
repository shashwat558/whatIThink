"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icon";
import { cn } from "@/lib/utils";
import axios from "axios";

import { redirect } from "next/navigation";

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type AuthFormData = z.infer<typeof authSchema>;

type AuthFormProps = {
  type: "signin" | "signup";
  className?: string;
};

export  function AuthForm({ type, className }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  
  
  const {
    register,
    handleSubmit,
    formState: { },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  async function onSubmit(data: z.infer<typeof authSchema>) {
    setIsLoading(true);
    try {
        const response = await axios.post(`localhost:8787/api/v1/user/${type === "signin" ? "signin":"signup"}`, {
            email: data.email,
            password: data.password
        })
        const token = response.data.token;
        localStorage.setItem("token", token);
        redirect("/blogs")
    } catch (error) {
        console.log(error)
    }
    
    
     
    console.log(data);
    setTimeout(() => setIsLoading(false), 1000);
     
  }

  return (
    <div className={cn("grid gap-6", className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-semibold">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="font-bold">Password</Label>
            <Input
              id="password"
              type="password"
              disabled={isLoading}
              {...register("password")}
            />
            
          </div>
          <Button type="submit" disabled={isLoading} className="bg-white text-black">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {type === "signin" ? "Sign In" : "Sign Up"}
          </Button>
        </div>
      </form>
      
        
      </div>
      
   
  );
}
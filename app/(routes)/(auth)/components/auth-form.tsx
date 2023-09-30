"use client";

import * as React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Divide, Eye, EyeOff, Rss } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Github } from "lucide-react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { UserMinLengthPassword } from "@/enum/users";

interface Props {
  isLogin?: boolean;
}

interface UserAuthFormProps
  extends Props,
    React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({
  isLogin,
  className,
  ...props
}: UserAuthFormProps) {
  const submitButtonLabel = isLogin ? "Login" : "Create your account";
  const toastSuccessMessage = isLogin
    ? "Your are now connected !"
    : "User created successfuly !";

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const formSchema = z.object({
    email: z.string().email().min(2).max(100),
    username: z.string().min(4).optional().or(z.literal("")),
    password: z.string().min(UserMinLengthPassword).max(100),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isLogin) {
      const response = await fetch("/api/users", { method: "GET" });
      const body = await response.json();
      if (response.ok) {
        toast.success(toastSuccessMessage);
      } else {
        toast.error(body.message);
      }
    } else {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const body = await response.json();
      if (response.ok) {
        toast.success(toastSuccessMessage);
      } else {
        toast.error(body.message);
      }
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Fill your email here..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {!isLogin && (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Fill your username here..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative mt-0">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Fill your password here..."
                      {...field}
                    />

                    <EyeOff
                      onClick={() => setShowPassword(!showPassword)}
                      className={cn(
                        "absolute bottom-0 right-4 top-0 my-auto h-4 w-4 cursor-pointer text-gray-500 transition-all duration-500",
                        !showPassword && "opacity-0"
                      )}
                    />
                    <Eye
                      onClick={() => setShowPassword(!showPassword)}
                      className={cn(
                        "absolute bottom-0 right-4 top-0 my-auto h-4 w-4 cursor-pointer text-gray-500 transition-all duration-500",
                        showPassword && "opacity-100"
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {submitButtonLabel}
          </Button>
        </form>
      </Form>
      <div className="mx-auto !mt-1 text-sm">
        {isLogin ? (
          <div>
            Haven't an account ?{" "}
            <Link href="create-an-account" className="text-blue-500 underline">
              {" "}
              Create here
            </Link>
          </div>
        ) : (
          <div>
            Already have an account ?{" "}
            <Link href="/login" className="text-blue-500 underline">
              {" "}
              Login here
            </Link>
          </div>
        )}
      </div>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={loading}>
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button> */}
    </div>
  );
}

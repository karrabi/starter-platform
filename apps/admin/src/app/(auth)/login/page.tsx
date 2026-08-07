"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/forms/form-field";

import { useLogin } from "@/hooks/use-login";

import { loginSchema, type LoginFormData } from "./schema";

export default function LoginPage() {
  const router = useRouter();

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      await loginMutation.mutateAsync(data);

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md px-4">
        <Card>
          <h1 className="mb-6 text-center text-3xl font-bold">Admin Login</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormField label="Email" error={errors.email?.message}>
              <Input type="email" {...register("email")} />
            </FormField>

            <FormField label="Password" error={errors.password?.message}>
              <Input type="password" {...register("password")} />
            </FormField>

            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing in..." : "Login"}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}

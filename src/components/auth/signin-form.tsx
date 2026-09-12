// =============================================================================
// LEASEGUARD B2B - Sign In Form
// =============================================================================
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "@/lib/actions/auth-actions";

const signinSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string().min(6, "Password troppo corta"),
});

type SigninFormData = z.infer<typeof signinSchema>;

export function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SigninFormData) => {
    startTransition(async () => {
      const result = await signIn(data);
      if (result.error) {
        toast({ title: "Errore", description: result.error, variant: "destructive" });
      } else {
        toast({ title: "Benvenuto!", description: "Accesso riuscito." });
        router.push("/dashboard");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="tuo@email.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Accesso in corso..." : "Accedi"}
        </Button>
      </form>
    </Form>
  );
}

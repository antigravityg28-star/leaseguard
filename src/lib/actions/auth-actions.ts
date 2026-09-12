// =============================================================================
// LEASEGUARD B2B - Authentication Actions
// =============================================================================
"use server";

import { createClientServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function signUp(formData: {
  email: string;
  password: string;
  fullName: string;
  companyName: string;
  vatNumber: string;
}) {
  const supabase = await createClientServer();

  const { data: authData, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        full_name: formData.fullName,
      },
    },
  });

  if (error) {
    return { error: error.message, success: false };
  }

  return { data: authData, error: null, success: true };
}

export async function signIn(formData: { email: string; password: string }) {
  const supabase = await createClientServer();

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    return { error: error.message, success: false };
  }

  return { data: authData, error: null, success: true };
}

export async function signOut() {
  const supabase = await createClientServer();
  await supabase.auth.signOut();
  revalidatePath("/");
}

export async function getUser() {
  const supabase = await createClientServer();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

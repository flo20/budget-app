"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(previousState,formData) {
	const email = formData.get('email')?.trim()
	const password = formData.get('password')

	if (!email || !password) {
		return {
			error: 'Email and password are required.',
		}
	}

	const supabase = await createClient()

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if (error) {
		return {
			error: error.message,
		}
	}

	revalidatePath('/', 'layout')
	redirect('/')
}

export async function signInAsDemo() {
  const demoEmail = process.env.DEMO_EMAIL;
  const demoPassword = process.env.DEMO_PASSWORD;

  if (!demoEmail || !demoPassword) {
    return {
			error: 'The demo account is not configured.',
		}
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: demoEmail,
    password: demoPassword,
  });

  if (error) {
    console.error("Demo sign-in failed:", error);

    return {
			error: 'Unable to access the demo account.',
		}
  }

  revalidatePath("/", "layout");
  redirect("/");
}
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signUp(formData) {
	const email = formData.get('email')?.trim()
	const password = formData.get('password')
	const confirmPassword = formData.get('confirmPassword')

	if (!email || !password || !confirmPassword) {
		redirect(`/sign-up?error=${encodeURIComponent('All fields are required')}`)
	}

	if (password !== confirmPassword) {
		redirect(`/sign-up?error=${encodeURIComponent('Passwords do not match')}`)
	}

	const supabase = await createClient()

	const { error } = await supabase.auth.signUp({
		email,
		password,
	})

	if (error) {
		redirect(`/sign-up?error=${encodeURIComponent(error.message)}`)
	}

	redirect(
		`/login?message=${encodeURIComponent(
			'Account created. You can now sign in.',
		)}`,
	)
}

export async function signIn(_previousState,formData) {
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


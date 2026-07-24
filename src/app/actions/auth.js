'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signUp(formData) {
	const email = formData.get('email')?.trim()
	const password = formData.get('password')
	const confirmPassword = formData.get('confirmPassword')

	if (!email || !password || !confirmPassword) {
		redirect(`/signup?error=${encodeURIComponent('All fields are required')}`)
	}

	if (password !== confirmPassword) {
		redirect(`/signup?error=${encodeURIComponent('Passwords do not match')}`)
	}

	const supabase = await createClient()

	const { error } = await supabase.auth.signUp({
		email,
		password,
	})

	if (error) {
		redirect(`/signup?error=${encodeURIComponent(error.message)}`)
	}

	redirect(
		`/signin?message=${encodeURIComponent(
			'Account created. You can now sign in.',
		)}`,
	)
}

export async function signIn(_previousState, formData) {
	const email = formData.get('email')?.trim()
	const password = formData.get('password')

	if (!email || !password) {
		return {
			error: 'Email and password are required.',
		}
	}

	const supabase = await createClient()

	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	console.log('Sign-in result:', {
		userId: data.user?.id,
		hasSession: Boolean(data.session),
		error: error?.message,
	})

	if (error) {
		return {
			error: error.message,
		}
	}

	revalidatePath('/dashboard', 'layout')
	redirect('/dashboard')
}

export async function signInAsDemo() {
	const supabase = await createClient()

	const demoEmail = process.env.DEMO_EMAIL
	const demoPassword = process.env.DEMO_PASSWORD

	const { error } = await supabase.auth.signInWithPassword({
		email: demoEmail,
		password: demoPassword,
	})

	if (!demoEmail || !demoPassword) {
		return {
			error: 'The demo account is not configured.',
		}
	}

	if (error) {
		return { error: error.message }
	}

	revalidatePath('/dashboard', 'layout')
	redirect('/dashboard')
}

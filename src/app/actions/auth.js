'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

import { seedDemoData } from '@/lib/demo/seedDemoData'

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

    console.time('demo: anonymous sign-in')

	const { data, error } = await supabase.auth.signInAnonymously()

    console.timeEnd('demo: anonymous sign-in')

if (error || !data.user) {
    console.error('Anonymous sign-in error:', error)
	return {
		error: error?.message ?? 'Unable to create demo session.',
	}
}

console.time('demo: seed data')
const seedResult = await seedDemoData(supabase)

console.timeEnd('demo: seed data')
if (!seedResult.success) {
	return {
		error: seedResult.error ?? 'Unable to prepare the demo account.',
	}
}

	revalidatePath('/dashboard', 'layout')
	redirect('/dashboard')
}

export async function requireUserOptional() {
	const supabase = await createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	return user ?? null
}
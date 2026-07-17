"use client"

import Link from 'next/link'
import SignInForm from './SignInForm'
import { signInAsDemo } from '@/app/actions/auth'

export default function LoginPage() {
	return (
		<main className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-sm space-y-6">
				<h1 className="text-2xl font-bold">Sign in to Valence</h1>

				<p>Manage your household finances in one place.</p>

				<form action={signInAsDemo}>
					<button
						type="submit"
						className="w-full rounded border py-2">
						Try Demo Account
					</button>
				</form>

				<div className="flex items-center gap-3">
					<div className="h-px flex-1 bg-gray-300" />
					<span>or sign in with your account</span>
					<div className="h-px flex-1 bg-gray-300" />
					<p className="text-sm text-gray-400">
						Need an account?
						<Link
							href="/signup"
							className="underline">
							Sign up
						</Link>
					</p>
				</div>
					<SignInForm />
			</div>
		</main>
	)
}

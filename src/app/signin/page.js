"use client"

import Link from 'next/link'

import SignInForm from '../../components/Auth/SignInForm'
import DemoLoginButton from '@/components/Auth/DemoLoginButton'

export default function SignInPage() {
	return (
		<main className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-sm space-y-6">
				<h1 className="text-2xl font-bold">Sign in to Balance</h1>
				<p>Manage your household finances in one place</p>
				<DemoLoginButton />
				<div className="flex items-center gap-3">
					<div className="h-px flex-1 bg-gray-300" />
					<span>or sign in with your account</span>
					<div className="h-px flex-1 bg-gray-300" />
					<div className="text-sm text-gray-400">
						Need an account?
						<Link
							href="/signup"
							className="underline">
							Sign up
						</Link>
					</div>
				</div>
				<SignInForm />
			</div>
		</main>
	)
}

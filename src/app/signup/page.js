import Link from 'next/link'

import SignUpForm from '../../components/Auth/SignUpForm'
import DemoLoginButton from '@/components/Auth/DemoLoginButton'
import NavBar from '@/components/NavBar/NavBar'

export default async function SignUpPage() {
	return (
        <>
        <NavBar/>
        <main className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-sm space-y-6">
				<h1 className="text-2xl font-bold">Sign Up with Balance</h1>
				<p>Manage your household finances in one place</p>
				<DemoLoginButton />
				<div className="flex items-center gap-3">
					<div className="h-px flex-1 bg-gray-300" />
					<span>or sign in with your account</span>
					<div className="h-px flex-1 bg-gray-300" />
					<div className="text-sm text-gray-400">
						Have an account?
						<Link
							href="/signin"
							className="underline">
							Sign in
						</Link>
					</div>
				</div>
				<SignUpForm />
			</div>
		</main>
        </>
		
	)
}

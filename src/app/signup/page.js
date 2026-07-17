import Link from 'next/link'
import { signUp, signInAsDemo } from '@/app/actions/auth'

export default async function SignUpPage({ searchParams }) {
	const params = await searchParams

	return (
		<>
			<form action={signInAsDemo}>
				<button
					type="submit"
					className="rounded border py-2">
					Try Demo Account
				</button>
			</form>
			<main className="flex min-h-screen items-center justify-center">
				<div className="w-full max-w-sm space-y-6">
					<h1 className="text-2xl font-bold">Create account</h1>

					{params?.error && (
						<p
							role="alert"
							className="text-sm text-red-500">
							{params.error}
						</p>
					)}

					<form
						action={signUp}
						className="space-y-4">
						<div>
							<label htmlFor="email">Email</label>

							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="w-full rounded border px-3 py-2"
							/>
						</div>

						<div>
							<label htmlFor="password">Password</label>

							<input
								id="password"
								name="password"
								type="password"
								autoComplete="new-password"
								minLength={6}
								required
								className="w-full rounded border px-3 py-2"
							/>
						</div>

						<div>
							<label htmlFor="confirmPassword">Confirm password</label>

							<input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								autoComplete="new-password"
								minLength={6}
								required
								className="w-full rounded border px-3 py-2"
							/>
						</div>

						<button
							type="submit"
							className="w-full rounded bg-blue-500 py-2 text-white">
							Create account
						</button>
					</form>

					<p className="text-sm">
						Already have an account?{' '}
						<Link
							href="/login"
							className="underline">
							Sign in
						</Link>
					</p>
				</div>
			</main>
		</>
	)
}

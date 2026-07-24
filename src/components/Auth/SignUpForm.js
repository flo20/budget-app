import { signUp } from '@/app/actions/auth'

export default async function SignUpForm() {

	return (
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
	)
}

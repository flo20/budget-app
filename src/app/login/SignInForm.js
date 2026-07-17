"use client"

import { useActionState } from 'react'
import { signIn } from '../actions/auth'

    const initialState = {
			error: null,
		}

export default function SignInForm() {
    const [state, formAction, isPending] = useActionState(signIn, initialState)

	return (
				<form
					action={formAction}
					className="space-y-4">
					<label htmlFor="email">Email</label>
					<input
						className="w-full rounded border px-3 py-2"
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
					/>

					<label htmlFor="password">Password</label>

					<input
						className="w-full rounded border px-3 py-2"
						id="password"
						name="password"
						type="password"
						autoComplete="current-password"
						required
					/>

					{state?.error && (
						<p
							role="alert"
							className="text-sm text-red-500">
							{state.error}
						</p>
					)}

					<div>
						<button
							type="submit"
							disabled={isPending}
							className="w-full rounded bg-blue-500 py-2 text-white disabled:opacity-50">
							{isPending ? 'Signing in...' : 'Sign in'}
						</button>
					</div>
				</form>
	)
}

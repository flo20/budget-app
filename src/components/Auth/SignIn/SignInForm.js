'use client'

import { useActionState } from 'react'
import { signIn } from '../../../app/actions/auth'

import { Form, FormField, FormInput } from '@/components/Form'

import styles from '../AuthCard.module.scss'

const initialState = {
	error: null,
}

export default function SignInForm() {
	const [state, formAction, isPending] = useActionState(signIn, initialState)

	return (
		<Form action={formAction}>
			<FormField
				htmlFor="email"
				label="Email">
				<FormInput
					className="w-full rounded border px-3 py-2"
					id="email"
					name="email"
					type="email"
					autoComplete="email"
					required
				/>
			</FormField>
			<FormField
				htmlFor="password"
				label="Password">
				<FormInput
					className="w-full rounded border px-3 py-2"
					id="password"
					name="password"
					type="password"
					autoComplete="current-password"
					required
				/>
			</FormField>

			{state?.error && (
				<p
					role="alert"
					className="text-sm text-red-500">
					{state.error}
				</p>
			)}

				<button
					type="submit"
					disabled={isPending}
					className={styles.signInButton}>
					{isPending ? 'Signing in...' : 'Sign in'}
				</button>
		</Form>
	)
}

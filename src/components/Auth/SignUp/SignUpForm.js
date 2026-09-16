import { signUp } from '@/app/actions/auth'

import { Form, FormField,FormInput } from '@/components/Form'

import styles from "../AuthCard.module.scss"

export default async function SignUpForm() {
	return (
		<Form action={signUp}>
			<FormField
				label="Email"
				htmlFor="email">
				<FormInput
					id="email"
					name="email"
					type="email"
					autoComplete="email"
					required
				/>
			</FormField>

			<FormField
				label="Password"
				htmlFor="password">
				<FormInput
					id="password"
					name="password"
					type="password"
					autoComplete="new-password"
					minLength={6}
					required
				/>
			</FormField>

			<FormField
				label="Confirm password"
				htmlFor="confirmPassword">
				<FormInput
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					autoComplete="new-password"
					minLength={6}
					required
				/>
			</FormField>

			<button
				type="submit"
				className={styles.submitButton}>
				Create account
			</button>
		</Form>
	)
}

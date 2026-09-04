import { signUp } from '@/app/actions/auth'

import styles from '../AuthCard.module.scss'

export default async function SignUpForm() {
	return (
		<form
			action={signUp}
			className={styles.form}>
			<div className={styles.field}>
				<label htmlFor="email">Email</label>

				<input
					id="email"
					name="email"
					type="email"
					autoComplete="email"
					required
					
				/>
			</div>

			<div className={styles.field}>
				<label htmlFor="password">Password</label>

				<input
					id="password"
					name="password"
					type="password"
					autoComplete="new-password"
					minLength={6}
					required
					
				/>
			</div>

			<div className={styles.field}>
				<label htmlFor="confirmPassword">Confirm password</label>

				<input
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					autoComplete="new-password"
					minLength={6}
					required
					
				/>
			</div>

			<button
				type="submit"
				className={styles.submitButton}>
				Create account
			</button>
		</form>
	)
}

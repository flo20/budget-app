import { signInAsDemo } from '@/app/actions/auth'

import styles from './SignIn/SignIn.module.scss'

export default function DemoLoginButton() {
	return (
		<form action={signInAsDemo}>
			<button
				type="submit"
				className={styles.demoButton}>
				Try Demo Account
			</button>
		</form>
	)
}

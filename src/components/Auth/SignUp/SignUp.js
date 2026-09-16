import Link from 'next/link'

import SignUpForm from './SignUpForm'
import DemoLoginButton from '../DemoLoginButton'

import { FormHeader } from '@/components/Form'

import styles from '../AuthCard.module.scss'

export default async function SignUp() {
	return (
		<main className={styles.page}>
			<section className={styles.card}>
				<FormHeader
					title="Sign Up with TALLY"
					description="Manage your household finances in one place"
				/>
				<DemoLoginButton />
				<div className={styles.divider}>
					<span />
					<p>or create your account</p>
					<span />
				</div>
				<SignUpForm />
				<p className={styles.authSwitch}>
					<span>Have an account?</span>
					<Link href="/signin">Sign in</Link>
				</p>
			</section>
		</main>
	)
}

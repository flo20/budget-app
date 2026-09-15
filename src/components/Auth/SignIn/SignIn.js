'use client'

import Link from 'next/link'
import DemoLoginButton from '../DemoLoginButton'
import SignInForm from './SignInForm'
import FormHeader from '@/components/form/FormHeader'

import styles from '../AuthCard.module.scss'

export default function SignIn() {
	return (
		<main className={styles.page}>
			<section className={styles.card}>
				<FormHeader
					title="Sign in to TALLY"
					description="Manage your household finances in one place"
				/>
				<DemoLoginButton />
				<div className={styles.divider}>
					<span />
					<p>or sign in with your account</p>
					<span />
				</div>

				<SignInForm />

				<p className={styles.authSwitch}>
					<span>Need an account?</span>
					<Link href="/signup">Sign up</Link>
				</p>
			</section>
		</main>
	)
}

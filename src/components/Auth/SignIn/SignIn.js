'use client'

import Link from 'next/link'
import DemoLoginButton from '../DemoLoginButton'
import SignInForm from './SignInForm'

import styles from '../AuthCard.module.scss'

export default function SignIn() {
	return (
		<main className={styles.page}>
			<section className={styles.card}>
				<header className={styles.header}>
					<h1>Sign in to TALLY</h1>
					<p>Manage your household finances in one place</p>
				</header>
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

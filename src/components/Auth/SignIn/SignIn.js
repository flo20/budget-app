'use client'

import Link from 'next/link'
import DemoLoginButton from '../DemoLoginButton'
import SignInForm from './SignInForm'

import styles from './SignIn.module.scss'

export default function SignIn() {
	return (
		<main className={styles.page}>
			<section className={styles.card}>
				<header className={styles.header}>
					<h1>Sign in to Balance</h1>
					<p>Manage your household finances in one place</p>
				</header>
				<DemoLoginButton />
				<div className={styles.divider}>
					<span />
					<p>or sign in with your account</p>
					<span />
				</div>

				<SignInForm />

				<p className={styles.signUp}>
					<span>Need an account?</span>
					<Link
						href="/signup"
						className="underline">
						Sign up
					</Link>
				</p>
			</section>
		</main>
	)
}

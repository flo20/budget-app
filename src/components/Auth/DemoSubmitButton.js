'use client'

import { useTransition } from 'react'
import { LoaderCircle } from 'lucide-react'

import { signInAsDemo } from '@/app/actions/auth'

import styles from './AuthCard.module.scss'

export default function DemoSubmitButton() {
	const [isPending, startTransition] = useTransition()

    const handleDemoLogin = () => {
		startTransition(async () => {
			await signInAsDemo()
		})
	}

	return (
		<button
			type="submit"
			onClick={handleDemoLogin}
			disabled={isPending}
            className={`${styles.button} ${styles.secondaryButton}`}
			>
			{isPending ? (
				<>
					<LoaderCircle
						className={styles.spinner}
						aria-hidden="true"
					/>
					Preparing Demo...
				</>
			) : (
				'TRY DEMO ACCOUNT'
			)}
		</button>
	)
}

'use client'

import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import styles from './Form.module.scss'

const FormInput = forwardRef(function FormInput(
	{ className = '', type = 'text', ...props },
	ref,
) {
	const [showPassword, setShowPassword] = useState(false)
	const isPassword = type === 'password'

	const input = (
		<input
			ref={ref}
			className={`${styles.control} ${className}`}
			type={isPassword && showPassword ? 'text' : type}
			{...props}
		/>
	)

	if (!isPassword) {
		return input
	}

	return (
		<div className={styles.passwordWrapper}>
			<input
				ref={ref}
				className={`${styles.control} ${styles.passwordControl} ${className}`}
				type={showPassword ? 'text' : 'password'}
				{...props}
			/>

			<button
				type="button"
				className={styles.passwordToggle}
				onClick={() => setShowPassword((prev) => !prev)}
				aria-label={showPassword ? 'Hide password' : 'Show password'}
				aria-pressed={showPassword}>
				{showPassword ? (
					<EyeOff
						size={18}
						aria-hidden="true"
					/>
				) : (
					<Eye
						size={18}
						aria-hidden="true"
					/>
				)}
			</button>
		</div>
	)
})

export default FormInput

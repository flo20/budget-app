import styles from './Form.module.scss'

export default function FormField({
	label,
	htmlFor,
	optional = false,
	error,
	children,
	className = '',
}) {
	return (
		<div className={`${styles.field} ${className}`}>
			{label && (
				<label
					htmlFor={htmlFor}
					className={styles.label}>
					{label}

					{optional && <span className={styles.optional}> (optional)</span>}
				</label>
			)}

			{children}

			{error && (
				<p
					className={styles.error}
					role="alert">
					{error}
				</p>
			)}
		</div>
	)
}

import styles from './Form.module.scss'

export default function FormButton({
	variant = 'primary',
	className = '',
	children,
	...props
}) {
	return (
		<button
			className={`${styles.button} ${styles[variant]} ${className}`}
			{...props}>
			{children}
		</button>
	)
}

import styles from './Form.module.scss'

export default function FormActions({
	children,
	className = '',
	variant = 'default',
}) {
	return (
		<div
			className={`${styles.actions} ${
				variant === 'inline' ? styles.inlineActions : ''
			}  ${className}`}>
			{children}
		</div>
	)
}

import styles from './Form.module.scss'

export default function FormSelect({ className = '', children, ...props }) {
	return (
		<select
			className={`${styles.control} ${styles.select} ${className}`}
			{...props}>
			{children}
		</select>
	)
}

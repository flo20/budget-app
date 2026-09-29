import styles from './Form.module.scss'

export default function FormTextarea({ className = '', ...props }) {
	return (
		<textarea
			className={`${styles.control} ${styles.textarea} ${className}`}
			{...props}
		/>
	)
}

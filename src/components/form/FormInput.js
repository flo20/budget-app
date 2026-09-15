import styles from './Form.module.scss'

export default function FormInput({ className = '', ...props }) {
	return (
		<input
			className={`${styles.control} ${className}`}
			{...props}
		/>
	)
}

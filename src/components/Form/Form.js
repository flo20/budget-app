import styles from './Form.module.scss'

export default function Form({ children, className = '', ...props }) {
	return (
		<form
			className={`${styles.form} ${className}`}
			{...props}>
			{children}
		</form>
	)
}

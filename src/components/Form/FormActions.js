import styles from './Form.module.scss'

export default function FormActions({ children, className = '' }) {
	return <div className={`${styles.actions} ${className}`}>{children}</div>
}

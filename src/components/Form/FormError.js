import styles from './Form.module.scss'

export default function FormError({ error }) {
	if (!error) return null

	return (
		<p
			className={styles.error}
			role="alert">
			{error}
		</p>
	)
}

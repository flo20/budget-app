import { X } from 'lucide-react'

import styles from './Form.module.scss'

export default function FormHeader({ title, description, onClose }) {
	return (
		<header className={styles.formHeader}>
			<div className={styles.formHeaderContent}>
				<h2>{title}</h2>

				{description && <p>{description}</p>}
			</div>

			<button
				type="button"
				className={styles.closeButton}
				onClick={onClose}
				aria-label="Close">
				<X />
			</button>
		</header>
	)
}

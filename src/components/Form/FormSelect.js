import { ChevronDown } from 'lucide-react'

import styles from './Form.module.scss'

export default function FormSelect({ className = '', children, ...props }) {
	return (
		<div className={styles.selectWrapper}>
			<select
				className={`${styles.control} ${styles.select} ${className}`}
				{...props}>
				{children}
			</select>
            <ChevronDown
				className={styles.selectIcon}
				aria-hidden="true"
			/>
		</div>
	)
}

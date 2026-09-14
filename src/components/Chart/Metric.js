import styles from './Chart.module.scss'

export default function Metric({ value, label, variant = 'default' }) {
	const valueStyles = {
		default: 'text-zinc-100',
		positive: 'text-emerald-400',
		negative: 'text-red-400',
	}
	return (
		<div className={styles.metric}>
			<p
				className={`${styles.metricValue} ${
					variant === 'positive'
						? styles.positive
						: variant === 'negative'
							? styles.negative
							: ''
				}`}>
				{value}
			</p>
			<p className={styles.metricLabel}>{label}</p>
		</div>
	)
}

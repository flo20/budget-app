import styles from './Chart.module.scss'

export default function ChartLegendItem({ color, label, dashed = false }) {
	return (
		<div className={styles.legendItem}>
			<span
				className={`${styles.legendLine} ${dashed ? styles.legendDashed : ''}`}
				style={{ borderColor: color }}
			/>
			<span>{label}</span>
		</div>
	)
}

import Metric from './Metric'

import styles from './Chart.module.scss'

export default function Metrics({ items }) {
	return (
		<div className={styles.metrics}>
			{items.map((item) => (
				<Metric
					key={item.label}
					value={item.value}
					label={item.label}
					variant={item.variant}
				/>
			))}
		</div>
	)
}

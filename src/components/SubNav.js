'use client'

import { useState } from 'react'
import styles from './SubNav.module.scss'

export default function SubNav() {
	const [period, setPeriod] = useState('Monthly')

	const updatePeriod = (period) => {
		setPeriod(period)
	}

	const today = new Date()
	const month = today.toLocaleString('default', { month: 'long' })
	const year = today.getFullYear()

	console.log('month', month)
	return (
		<div className={styles.flex}>
			<div>
				<h5>
					{month} {year}
				</h5>
				<h5>HOUSEHOLD</h5>
				<h2>{period} Pulse</h2>
			</div>
			<div>
				<div className={styles.period}>
					<div>
						<button onClick={() => updatePeriod('Monthly')}>Month</button>
						<button onClick={() => updatePeriod('Yearly')}>Year</button>
						<button onClick={() => updatePeriod('Lifetime')}>All</button>
					</div>
					<button>Calendar pill</button>
				</div>
			</div>
		</div>
	)
}

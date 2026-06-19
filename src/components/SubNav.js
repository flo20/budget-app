'use client'

import { useState } from 'react'
import styles from './SubNav.module.scss'

export default function SubNav() {
    const PERIODS = {
			MONTHLY: 'Monthly',
			YEARLY: 'Yearly',
			LIFETIME: 'Lifetime',
		}

		const periodButtons = [
			{ label: 'Month', value: PERIODS.MONTHLY },
			{ label: 'Year', value: PERIODS.YEARLY },
			{ label: 'All', value: PERIODS.LIFETIME },
		]
		const [period, setPeriod] = useState(PERIODS.MONTHLY)
		// const isYearly = period === PERIODS.YEARLY
		const isLifetime = period === PERIODS.LIFETIME

				const updatePeriod = (period) => {
					setPeriod(period)
				}

	const today = new Date()
	const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
		today,
	)
	const year = today.getFullYear()

	return (
		<div className={styles.flex}>
			<div>
				<header>
					{isLifetime && <h5>ALL TIME</h5>}
					{period === PERIODS.MONTHLY && <h5>{month}</h5>}
					{!isLifetime && <h5>{year}</h5>}
				</header>

				<h5>HOUSEHOLD</h5>
				<h2>{period} Pulse</h2>
			</div>
			<div>
				<div className={styles.period}>
					<div>
						{periodButtons.map((periodButton) => (
							<button
								className={
									periodButton.value === PERIODS.MONTHLY ? styles.active : ' '
								}
								aria-pressed={period === PERIODS.MONTHLY}
								onClick={() => updatePeriod(periodButton.value)}
								key={periodButton.value}>
								{periodButton.label}
							</button>
						))}
					</div>
					{!isLifetime && <button>Calendar pill</button>}
				</div>
			</div>
		</div>
	)
}

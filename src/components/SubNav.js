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

        const today = new Date()
				const month = new Intl.DateTimeFormat('en-US', {
					month: 'long',
				}).format(today)
				const year = today.getFullYear()

		const [period, setPeriod] = useState(PERIODS.MONTHLY)
        const [date, setDate] = useState(today)
				const [viewMode, setViewMode] = useState(PERIODS.MONTHLY)
				const isMonthly = period === PERIODS.MONTHLY
				const isYearly = period === PERIODS.YEARLY
		const isLifetime = period === PERIODS.LIFETIME


		const updatePeriod = (period) => {
			setPeriod(period)
			setViewMode(period)
		}

		const changeMonth = (delta) => {
			setDate((prev) => {
				const next = new Date(prev)
				next.setMonth(next.getMonth() + delta)

				return next
			})
		}

		const changeYear = (delta) => {
			setDate((prev) => {
				const next = new Date(prev)
				next.setFullYear(next.getFullYear() + delta)
				return next
			})
		}


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
									viewMode === periodButton.value ? styles.active : ' '
								}
								aria-pressed={period === viewMode}
								onClick={() => updatePeriod(periodButton.value)}
								key={periodButton.value}>
								{periodButton.label}
							</button>
						))}
					</div>
					{/* Month View */}
					{!isLifetime && isMonthly && (
						<>
							<button onClick={() => changeMonth(-1)}>{'<'} </button>
							{new Intl.DateTimeFormat('en-US', {
								month: 'long',
								year: 'numeric',
							}).format(date)}
							<button onClick={() => changeMonth(1)}> {'>'}</button>
						</>
					)}

					{/* Year View */}
					{!isLifetime && isYearly && (
						<>
							<button onClick={() => changeYear(-1)}>{'<'} </button>
							{date.getFullYear()}
							<button onClick={() => changeYear(1)}> {'>'}</button>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

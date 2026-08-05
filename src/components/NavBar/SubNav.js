'use client'

import { useState } from 'react'
import styles from './SubNav.module.scss'


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

export default function SubNav() {
	const [period, setPeriod] = useState(PERIODS.MONTHLY)
	const [viewMode, setViewMode] = useState(PERIODS.MONTHLY)

	const [date, setDate] = useState(() => new Date())

	const month = new Intl.DateTimeFormat('en-US', {
		month: 'long',
	}).format(date)
	const year = date.getFullYear()

	const isMonthly = period === PERIODS.MONTHLY
	const isYearly = period === PERIODS.YEARLY
	const isLifetime = period === PERIODS.LIFETIME

	const updatePeriod = (newPeriod) => {
		setPeriod(newPeriod)
		setViewMode(newPeriod)
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
			<header>
				<div className={styles.periodHeader}>
					{isLifetime && <h5>ALL TIME</h5>}
					{period === PERIODS.MONTHLY && <h5>{month}</h5>}
					{!isLifetime && <h5>{year}</h5>}
					<h5>HOUSEHOLD</h5>
				</div>
				<h2>{period} Pulse</h2>
			</header>
			<div>
				<div className={styles.period}>
					<div>
						{periodButtons.map((periodButton) => (
							<button
								className={
									viewMode === periodButton.value ? styles.active : ' '
								}
								onClick={() => updatePeriod(periodButton.value)}
								aria-pressed={viewMode === periodButton.value}
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

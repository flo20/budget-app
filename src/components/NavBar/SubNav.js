'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { periodButtons, PERIODS } from '@/lib/constants/periods'
import styles from './SubNav.module.scss'

export default function SubNav({ budgetMonth }) {
	const router = useRouter()
	const searchParams = useSearchParams()

	const [period, setPeriod] = useState(PERIODS.MONTHLY)
	const [viewMode, setViewMode] = useState(PERIODS.MONTHLY)

	const [year, month] = budgetMonth.split('-').map(Number)
	const date = new Date(year, month - 1, 1)

	const monthLabel = new Intl.DateTimeFormat('en-US', {
		month: 'long',
	}).format(date)

	const displayYear = date.getFullYear()

	const isMonthly = period === PERIODS.MONTHLY
	const isYearly = period === PERIODS.YEARLY
	const isLifetime = period === PERIODS.LIFETIME

	const updatePeriod = (newPeriod) => {
		setPeriod(newPeriod)
		setViewMode(newPeriod)
	}

	function changeYear(delta) {
		const nextDate = new Date(year + delta, month - 1, 1)
		updateMonthParam(nextDate)
	}

	function updateMonthParam(date) {
		const monthParam = `${date.getFullYear()}-${String(
			date.getMonth() + 1,
		).padStart(2, '0')}`

		const params = new URLSearchParams(searchParams.toString())

		params.set('month', monthParam)

		router.push(`/dashboard?${params.toString()}`)
	}

	function changeMonth(delta) {
		const nextDate = new Date(year, month - 1 + delta, 1)

		updateMonthParam(nextDate)
	}

	return (
		<div className={styles.flex}>
			<header>
				<div className={styles.periodHeader}>
					{isLifetime && <h5>ALL TIME</h5>}
					{period === PERIODS.MONTHLY && <h5>{monthLabel}</h5>}
					{!isLifetime && <h5>{displayYear}</h5>}
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

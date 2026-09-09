'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

	const currentPeriodLabel = isLifetime
		? 'All time'
		: isYearly
			? `${displayYear}`
			: new Intl.DateTimeFormat('en-US', {
					month: 'long',
					year: 'numeric',
				}).format(date)

	return (
		<section className={styles.subNav}>
			<header className={styles.heading}>
				<div className={styles.periodHeader}>
					{isLifetime ? (
						<span>All time</span>
					) : (
						<>
							{isMonthly && <span>{monthLabel}</span>}
							<span>{displayYear}</span>
						</>
					)}

					<span className={styles.separator}>·</span>
					<span>HOUSEHOLD</span>
				</div>
				<h2>{period} Pulse</h2>
			</header>

			<div className={styles.controls}>
				<div className={styles.periodSelector}>
					{periodButtons.map((periodButton) => {
						const isActive = viewMode === periodButton.value
						return (
							<button
								type="button"
								className={`${styles.periodButton} ${
									isActive ? styles.active : ''
								}`}
								onClick={() => updatePeriod(periodButton.value)}
								aria-pressed={isActive}
								key={periodButton.value}>
								{periodButton.label}
							</button>
						)
					})}
				</div>
				{/* Month View */}
				{!isLifetime && (
					<div className={styles.dateSelector}>
						<button
							type="button"
							className={styles.arrowButton}
							onClick={() => (isMonthly ? changeMonth(-1) : changeYear(-1))}
							aria-label={isMonthly ? 'Previous month' : 'Previous year'}>
							<ChevronLeft />
						</button>

						<span className={styles.dateLabel}>{currentPeriodLabel}</span>
						<button
							type="button"
							className={styles.arrowButton}
							onClick={() => (isMonthly ? changeMonth(1) : changeYear(1))}
							aria-label={isMonthly ? 'Next month' : 'Next year'}>
							<ChevronRight />
						</button>
					</div>
				)}
			</div>
		</section>
	)
}

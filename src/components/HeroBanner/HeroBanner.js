import Link from 'next/link'

import { categories, weeklySpend } from '@/lib/constants/hero-banner'
import { signInAsDemo } from '@/app/actions/auth'
import { ArrowRight, Check, ShieldCheck, Sparkles } from 'lucide-react'

import styles from './HeroBanner.module.scss'

export default function HeroBanner() {
	return (
		<section className={styles.hero}>
			<div className={styles.inner}>
				<div className={styles.content}>
					<p className={styles.eyebrow}>HOUSEHOLD FINANCE, IN FOCUS</p>

					<h1 className={styles.title}>Stay ahead <br/>of your finances.</h1>

					<p className={styles.description}>
						Tally forecasts your cash flow, tracks every category against its
						budget, and keeps assets, debts and deadlines in one calm dashboard.
					</p>

					<div className={styles.actions}>
						<Link
							href="/signup"
							className={`${styles.button} ${styles.primaryButton}`}>
							<span>GET STARTED FREE</span>
							<ArrowRight
								size={18}
								strokeWidth={1.8}
							/>
						</Link>
						<form action={signInAsDemo}>
							<button
								type="submit"
								className={`${styles.button} ${styles.secondaryButton}`}>
								TRY DEMO ACCOUNT
							</button>
						</form>
					</div>

					<div className={styles.benefits}>
						<div className={styles.benefit}>
							<Check size={16} />
							<span>NO CARD REQUIRED</span>
						</div>

						<div className={styles.benefit}>
							<ShieldCheck size={16} />
							<span>YOUR DATA STAYS PRIVATE</span>
						</div>

						<div className={styles.benefit}>
							<Sparkles size={16} />
							<span>CANCEL ANYTIME</span>
						</div>
					</div>
				</div>

				<div className={styles.previewWrapper}>
					<div className={styles.previewCard}>
						<div className={styles.balance}>
							<p>APRIL BALANCE</p>
							<strong>$4,283.12</strong>
						</div>

						<div className={styles.chart}>
							{weeklySpend.map((bar, index) => (
								<div
									key={index}
									className={`${styles.bar} ${
										bar.type === 'negative'
											? styles.negativeBar
											: styles.positiveBar
									}`}
									style={{
										height: `${bar.height}%`,
									}}
								/>
							))}
						</div>

						<p className={styles.chartCaption}>
							WEEKLY SPEND · FORECAST OVERLAY
						</p>

						<div className={styles.categories}>
							{categories.map((category) => {
								const percentage = Math.min(
									(category.spent / category.budget) * 100,
									100,
								)

								return (
									<div
										key={category.name}
										className={styles.category}>
										<div className={styles.categoryHeader}>
											<span>{category.name}</span>

											<span>
												${category.spent} / ${category.budget}
											</span>
										</div>

										<div className={styles.progressTrack}>
											<div
												className={`${styles.progressValue} ${
													category.status === 'over'
														? styles.progressOver
														: styles.progressGood
												}`}
												style={{
													width: `${percentage}%`,
												}}
											/>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

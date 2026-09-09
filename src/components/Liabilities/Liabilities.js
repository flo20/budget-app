import { getLiabilities } from '@/lib/queries/liabilities'
import { formatCurrency } from '@/lib/utils/format'
import LiabilitiesHeader from './LiabilitiesHeader'
import DeleteButton from './DeleteButton'

import styles from './Liabilities.module.scss'

export default async function Liabilities() {
	const liabilities = await getLiabilities()

	const totalLiabilities = liabilities.reduce(
		(total, liability) => total + Number(liability.current_balance || 0),
		0,
	)

	return (
		<section
			id="liabilities"
			className={styles.container}>
			<LiabilitiesHeader />
			<strong className={styles.total}>
				{formatCurrency(totalLiabilities)}
			</strong>
			<ul className={styles.list}>
				{liabilities.map((liability) => {
					const currentBalance = Number(liability.current_balance || 0)
					const originalAmount = Number(liability.original_amount || 0)

					const paidPercentage =
						originalAmount > 0
							? Math.min(
									100,
									Math.max(
										0,
										((originalAmount - currentBalance) / originalAmount) * 100,
									),
								)
							: 0

					return (
						<li
							key={liability.id}
							className={styles.liability}
							data-type={liability.liability_type}>
							<div className={styles.liabilityTop}>
								<div className={styles.liabilityName}>
									<span
										className={styles.icon}
										aria-hidden="true">
										{liability.liability_type === 'mortgage' ? '▥' : '▭'}
									</span>
									<h3>{liability.name}</h3>
								</div>
								<strong className={styles.balance}>
									{formatCurrency(liability.current_balance)}
								</strong>
							</div>
							<div className={styles.progressTrack}>
								<span
									className={styles.progressBar}
									style={{
										width: `${paidPercentage}%`,
									}}
								/>
							</div>
							<div className={styles.metaRow}>
								{originalAmount > 0 && (
									<span>{paidPercentage.toFixed(0)}% paid off</span>
								)}

								{liability.apr && <span>{Number(liability.apr)}% APR</span>}

								{liability.monthly_payment && (
									<>
										<span className={styles.dot}>·</span>
										<span>
											{formatCurrency(liability.monthly_payment)}
											/mo
										</span>
									</>
								)}
							</div>
							<div className={styles.deleteWrap}>
								<DeleteButton liability={liability} />
							</div>
						</li>
					)
				})}
			</ul>
		</section>
	)
}

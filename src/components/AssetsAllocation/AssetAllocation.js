import { getAssets } from '@/lib/queries/assets'
import { buildAssetSummary } from '@/lib/assets/asset-summary'
import { formatCurrency, formatPercentage } from '@/lib/utils/format'

import { Pencil, Trash2 } from 'lucide-react'

import AssetHeader from './AssetHeader'

import styles from './AssetInventory.module.scss'

function buildAllocationGradient(allocations) {
	let current = 0

	const segments = allocations.map((allocation) => {
		const start = current
		const end = current + allocation.percentage

		current = end

		return `${allocation.color} ${start}% ${end}%`
	})

	return `conic-gradient(${segments.join(', ')})`
}

export default async function AssetAllocation() {
	const assets = await getAssets()
	const summary = buildAssetSummary(assets)

	const allocationGradient = buildAllocationGradient(summary.allocations)

	const diversificationLabel =
		summary.allocations.length > 2
			? 'Diversified'
			: summary.allocations.length > 1
				? 'Lightly diversified'
				: 'Single asset class'

	return (
		<section
			id="assets"
			className={styles.container}>
			<AssetHeader />
			{summary.holdingsCount === 0 ? (
				<div className={styles.emptyState}>
					<p className={styles.emptyTitle}>No assets recorded</p>
					<p>Add your first asset to see how your holdings are distributed.</p>
				</div>
			) : (
				<>
					<div className={styles.allocationOverview}>
						<div
							className={styles.donut}
							style={{ background: allocationGradient }}
							role="img"
							aria-label={`Asset allocation chart showing ${summary.allocations
								.map(
									(allocation) =>
										`${allocation.label} ${formatPercentage(
											allocation.percentage,
										)}`,
								)
								.join(', ')}`}>
							<div className={styles.donutCenter}>
								<span>Total</span>

								<strong>{formatCurrency(summary.totalAssets)}</strong>
							</div>
						</div>

						<div className={styles.allocationDetails}>
							<p className={styles.allocationSummary}>
								{summary.holdingsCount}{' '}
								{summary.holdingsCount === 1 ? 'holding' : 'holdings'}
								<span>·</span>
								{diversificationLabel}
							</p>
							<ul className={styles.allocationList}>
								{summary.allocations.map((allocation) => {
									const value =
										summary.totalAssets * (allocation.percentage / 100)
									return (
										<li key={allocation.assetType}>
											<div className={styles.allocationName}>
												<span
													className={styles.colorDot}
													style={{
														backgroundColor: allocation.color,
													}}
												/>

												<span>{allocation.label}</span>
											</div>
											<div className={styles.allocationValue}>
												<strong>{formatCurrency(value)}</strong>
												<span>{formatPercentage(allocation.percentage)}</span>
											</div>
										</li>
									)
								})}
							</ul>
						</div>
					</div>

					<div className={styles.holdings}>
						<ul className={styles.holdingsList}>
							{summary.holdings.map((holding) => (
								<li key={holding.id}>
									<div className={styles.holdingInfo}>
										<span
											className={styles.holdingIcon}
											style={{
												color: holding.color,
											}}
											aria-hidden="true">
											{holding.assetType === 'property' ? '▤' : '⌁'}
										</span>
										<div>
											<strong>{holding.name}</strong>

											<span>
												{holding.typeLabel}
												<span aria-hidden="true"> · </span>
												{formatPercentage(holding.percentage)}
											</span>
										</div>
									</div>

									<div className={styles.holdingRight}>
										<strong className={styles.holdingValue}>
											{formatCurrency(holding.value)}
										</strong>
										<div className={styles.holdingActions}>
											<button
												type="button"
												className={styles.editButton}
												aria-label={`Edit ${holding.name}`}>
												<Pencil />
											</button>

											<button
												type="button"
												className={styles.deleteButton}
												aria-label={`Delete ${holding.name}`}>
												<Trash2 />
											</button>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</>
			)}
		</section>
	)
}

import { getAssets } from '@/lib/queries/assets'
import { buildAssetSummary } from '@/lib/assets/asset-summary'
import { formatCurrency, formatPercentage } from '@/lib/utils/format'
import { buildAllocationGradient } from '@/lib/constants/asset-allocation'

import AssetHeader from './AssetHeader'
import AssetHoldings from './AssetHoldings'

import styles from './AssetAllocation.module.scss'

export default async function AssetAllocation() {
	const assets = await getAssets()
	const summary = buildAssetSummary(assets)
    const holdings = summary.holdings

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
					<AssetHoldings holdings={holdings} />
				</>
			)}
		</section>
	)
}

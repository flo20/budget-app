import { getAssets } from '@/lib/queries/assets'
import { buildAssetSummary } from '@/lib/assets/asset-summary'
import { formatCurrency, formatPercentage } from '@/lib/utils/format'

import AssetHeader from './AssetHeader'

import styles from "./AssetInventory.module.scss"

export default async function AssetAllocation() {
	const assets = await getAssets()

	const summary = buildAssetSummary(assets)

	return (
		<section
			id="assets"
			className={styles.container}>
			<AssetHeader />
			<div>
				{summary.holdingsCount === 0 ? (
					<div>
						<p className={styles.emptyTitle}>No assets recorded</p>

						<p>
							Add your first asset to see how your holdings are distributed.
						</p>
					</div>
				) : (
					<>
						<div>
							<div
								role="img"
								aria-label={`Asset allocation chart showing ${summary.allocations
									.map(
										(allocation) =>
											`${allocation.label} ${formatPercentage(
												allocation.percentage,
											)}`,
									)
									.join(', ')}`}>
								<div />
							</div>

							<div>
								<strong>{formatCurrency(summary.totalAssets)}</strong>

								<p>
									Total assets ·{' '}
									{summary.allocations.length > 1
										? 'Diversified'
										: 'Single asset class'}
								</p>

								<ul>
									{summary.allocations.map((allocation) => (
										<li key={allocation.assetType}>
											<span>
												<span
													style={{
														backgroundColor: allocation.color,
													}}
												/>

												{allocation.label}
											</span>

											<span>{formatPercentage(allocation.percentage)}</span>
										</li>
									))}
								</ul>

								{summary.largestAllocation && (
									<p>
										<strong>{summary.largestAllocation.label}</strong> is your
										largest position at{' '}
										{formatPercentage(summary.largestAllocation.percentage)}.
									</p>
								)}
							</div>
						</div>

						<div>
							<header>
								<h3>Holdings</h3>

								<span>
									{summary.holdingsCount}{' '}
									{summary.holdingsCount === 1 ? 'item' : 'items'}
								</span>
							</header>

							<ul>
								{summary.holdings.map((holding) => (
									<li key={holding.id}>
										<span
											style={{
												color: holding.color,
											}}
											aria-hidden="true">
											{holding.assetType === 'property' ? '▤' : '⌁'}
										</span>

										<div>
											<strong>{holding.name}</strong>

											<span>
												{holding.typeLabel} ·{' '}
												{formatPercentage(holding.percentage)}
											</span>
										</div>

										<strong>{formatCurrency(holding.value)}</strong>
									</li>
								))}
							</ul>
						</div>
					</>
				)}
			</div>
		</section>
	)
}

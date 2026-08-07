import { toValidNumber} from '../utils/number-parsing'
import { ASSET_TYPE_DETAILS } from '../constants/asset-types'


export function buildAssetSummary(assets) {
	// Calculate the value of all recorded assets.
	const totalAssets = assets.reduce((total, asset) => {
		return total + toValidNumber(asset.current_value)
	}, 0)

	// Group asset values by asset type.
	const totalsByType = assets.reduce((totals, asset) => {
		const assetType =
			asset.asset_type in ASSET_TYPE_DETAILS ? asset.asset_type : 'other'

		const value = toValidNumber(asset.current_value)

		totals[assetType] = (totals[assetType] ?? 0) + value

		return totals
	}, {})

	/*
	 * Convert the grouped object into an array
	 * that can be rendered in the chart legend.
	 */
	const allocations = Object.entries(totalsByType)
		.map(([assetType, value]) => {
			const percentage = totalAssets > 0 ? (value / totalAssets) * 100 : 0

			return {
				assetType,
				label: ASSET_TYPE_DETAILS[assetType].label,
				color: ASSET_TYPE_DETAILS[assetType].color,
				value,
				percentage,
			}
		})
		.sort((first, second) => second.value - first.value)

	/*
	 * Give every individual holding its own
	 * percentage and display information.
	 */
	const holdings = assets
		.map((asset) => {
			const value = toValidNumber(asset.current_value)

			const percentage = totalAssets > 0 ? (value / totalAssets) * 100 : 0

			const assetType =
				asset.asset_type in ASSET_TYPE_DETAILS ? asset.asset_type : 'other'

			return {
				id: asset.id,
				name: asset.name,
				assetType,
				typeLabel: ASSET_TYPE_DETAILS[assetType].label,
				color: ASSET_TYPE_DETAILS[assetType].color,
				value,
				percentage,
			}
		})
		.sort((first, second) => second.value - first.value)

	const largestAllocation = allocations[0] ?? null

	return {
		totalAssets,
		holdingsCount: holdings.length,
		allocations,
		holdings,
		largestAllocation,
	}
}

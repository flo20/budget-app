'use client'

import { useModal } from '@/app/providers/GlobalProvider'
import { createAsset } from '@/app/actions/assets'

// import styles from './AssetInventory.module.scss'

export default function AssetForm() {
	const { closeAssetModal } = useModal()
	return (
		<form action={createAsset}>
			<label htmlFor="asset-name">Asset name</label>
			<input
				id="asset-name"
				name="assetName"
				type="text"
				maxLength={100}
				required
			/>

			<label htmlFor="asset-type">Asset type</label>

			<select
				id="asset-type"
				name="assetType"
				required>
				<option value="">Select an asset type</option>

				<option value="cash">Cash</option>
				<option value="investment">Investment</option>
				<option value="property">Property</option>
				<option value="retirement">Retirement</option>
				<option value="other">Other</option>
			</select>

			<label htmlFor="current-value">Current value</label>

			<input
				id="current-value"
				name="currentValue"
				type="number"
				min="0"
				step="0.01"
				required
			/>

			<label htmlFor="asset-notes">Notes</label>

			<textarea
				id="asset-notes"
				name="notes"
				maxLength={500}
			/>

			<button
				type="submit"
				onClick={closeAssetModal}>
				Cancel
			</button>
			<button type="submit">Add asset</button>
		</form>
	)
}

'use client'

import { useState } from 'react'

import { AssetRow } from './AssetRow'
import { EditAssetRow } from './EditAssetRow'

import styles from './AssetAllocation.module.scss'

export default function AssetHoldings({ holdings }) {
	const [editingId, setEditingId] = useState(null)

	return (
		<div className={styles.holdings}>
			<ul className={styles.holdingsList}>
				{holdings.map((holding) => {
					const isEditing = editingId === holding.id

					return (
						<li key={holding.id}>
							{isEditing ? (
								<EditAssetRow
									holding={holding}
									onCancel={() => setEditingId(null)}
								/>
							) : (
								<AssetRow
									holding={holding}
									onEdit={() => setEditingId(holding.id)}
								/>
							)}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

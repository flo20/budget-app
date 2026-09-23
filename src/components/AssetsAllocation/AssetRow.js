import { formatCurrency, formatPercentage } from '@/lib/utils/format'
import { deleteAsset } from '@/app/actions/assets'
import { getAssetIcon } from '@/lib/constants/asset-allocation'

import { Form, FormButton } from '@/components/Form'

import { Pencil, Trash2 } from 'lucide-react'

import styles from './AssetAllocation.module.scss'

export function AssetRow({ holding, onEdit }) {
	return (
		<>
			<div className={styles.holdingInfo}>
				<span
					className={styles.holdingIcon}
					style={{ color: holding.color }}
					aria-hidden="true">
					{getAssetIcon(holding.assetType)}
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
						onClick={onEdit}
						aria-label={`Edit ${holding.name}`}>
						<Pencil />
					</button>

					<Form
						action={deleteAsset}
						className={styles.deleteForm}>
						<input
							type="hidden"
							name="assetId"
							value={holding.id}
						/>

						<FormButton
							type="submit"
							className={styles.deleteButton}
							aria-label={`Delete ${holding.name}`}>
							<Trash2 />
						</FormButton>
					</Form>
				</div>
			</div>
		</>
	)
}

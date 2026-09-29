import { updateAsset } from '@/app/actions/assets'
import { Check, X } from 'lucide-react'
import {
	Form,
	FormField,
	FormInput,
	FormSelect,
	FormActions,
	FormButton,
} from '@/components/Form'

import styles from './AssetAllocation.module.scss'

export function EditAssetRow({ holding, onCancel }) {
	return (
		<Form
			action={updateAsset}
			className={styles.editAssetForm}>
			<input
				type="hidden"
				name="assetId"
				value={holding.id}
			/>

			<FormField className={styles.editNameField}>
				<FormInput
					name="assetName"
					type="text"
					defaultValue={holding.name}
					maxLength={100}
					aria-label="Asset name"
					placeholder="Asset name"
					required
				/>
			</FormField>

			<FormField className={styles.editTypeField}>
				<FormSelect
					name="assetType"
					defaultValue={holding.assetType}
					aria-label="Asset type"
					required>
					<option value="investment">Investment</option>
					<option value="cash">Cash</option>
					<option value="property">Property</option>
					<option value="other">Other</option>
				</FormSelect>
			</FormField>

			<FormField className={styles.editValueField}>
				<FormInput
					name="currentValue"
					type="number"
					defaultValue={holding.value}
					min="0"
					step="0.01"
					inputMode="decimal"
					aria-label="Current value"
                    placeholder="Current value"
					required
				/>
			</FormField>

			<FormActions className={styles.editActions}>
				<FormButton
					type="submit"
					className={styles.saveEditButton}
					aria-label={`Save changes to ${holding.name}`}>
					<Check />
				</FormButton>

				<FormButton
					type="button"
					className={styles.cancelEditButton}
					onClick={onCancel}
					aria-label="Cancel editing">
					<X />
				</FormButton>
			</FormActions>
		</Form>
	)
}

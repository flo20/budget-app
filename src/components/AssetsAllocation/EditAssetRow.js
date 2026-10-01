import { updateAsset } from '@/app/actions/assets'
import { useFormAction } from '../hooks/useFormActions'
import { Check, X } from 'lucide-react'
import {
	Form,
	FormField,
	FormInput,
	FormSelect,
	FormActions,
	FormButton,
	FormError,
} from '@/components/Form'

import styles from './AssetAllocation.module.scss'

export function EditAssetRow({ holding, onCancel }) {
	const { formAction, isPending, error } = useFormAction(updateAsset, onCancel)
	return (
		<Form
			action={formAction}
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
			<FormError error={error} />
			<FormActions
				variant="inline"
				className={styles.editActions}>
				<FormButton
					type="button"
					className={styles.cancelEditButton}
					onClick={onCancel}
					aria-label="Cancel editing"
					disabled={isPending}>
					<X />
				</FormButton>
				<FormButton
					type="submit"
					className={styles.saveEditButton}
					aria-label={`Save changes to ${holding.name}`}
					disabled={isPending}>
					<Check />
				</FormButton>
			</FormActions>
		</Form>
	)
}

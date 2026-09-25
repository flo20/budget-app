'use client'

import { useFormAction } from '../hooks/useFormActions'
import { useModal } from '@/app/providers/GlobalProvider'
import { createAsset } from '@/app/actions/assets'
import { ASSET_TYPES } from '@/lib/constants/asset-allocation'

import {
	Form,
	FormHeader,
	FormField,
	FormInput,
	FormSelect,
	FormTextarea,
	FormActions,
	FormButton,
	FormError,
} from '@/components/Form'

export default function AssetForm() {
	const { closeAssetModal } = useModal()

	const { formAction, isPending, error } = useFormAction(
		createAsset,
		closeAssetModal,
	)

	return (
		<>
			<FormHeader
				title="New Asset"
				description="Track an account, investment, or owned item."
				onClose={closeAssetModal}
			/>
			<Form action={formAction}>
				<FormField
					label="Asset name"
					htmlFor="asset-name">
					<FormInput
						id="asset-name"
						name="assetName"
						type="text"
						maxLength={100}
						placeholder="e.g. Savings account"
						required
					/>
				</FormField>
				<FormField
					label="Asset type"
					htmlFor="asset-type">
					<FormSelect
						id="asset-type"
						name="assetType"
						defaultValue=""
						required>
						<option
							value=""
							disabled>
							Select an asset type
						</option>
						{ASSET_TYPES.map((asset) => (
							<option
								value={asset}
								key={asset}>
								{asset}
							</option>
						))}
					</FormSelect>
				</FormField>

				<FormField
					htmlFor="current-value"
					label="Current value">
					<FormInput
						id="current-value"
						name="currentValue"
						type="number"
						min="0"
						step="0.01"
						required
					/>
				</FormField>
				<FormField
					htmlFor="asset-notes"
					label="Notes">
					<FormTextarea
						id="asset-notes"
						name="notes"
						maxLength={500}
					/>
				</FormField>
				<FormError error={error} />
				<FormActions>
					<FormButton
						type="button"
						variant="secondary"
						onClick={closeAssetModal}
						disabled={isPending}>
						Cancel
					</FormButton>
					<FormButton
						type="submit"
						disabled={isPending}>
						{isPending ? 'Adding...' : 'Add asset'}
					</FormButton>
				</FormActions>
			</Form>
		</>
	)
}

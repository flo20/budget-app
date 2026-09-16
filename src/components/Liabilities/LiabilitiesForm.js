'use client'

import { createLiability } from '@/app/actions/liabilities'
import { LIABILITY_TYPES } from '@/lib/constants/liability-types'
import { useModal } from '@/app/providers/GlobalProvider'

import Form from '../form/Form'
import FormHeader from '../form/FormHeader'
import FormField from '../form/FormField'
import FormInput from '../form/FormInput'
import FormSelect from '../form/FormSelect'
import FormActions from '../form/FormActions'
import FormButton from '../form/FormButtons'

export default function LiabilitiesForm() {
	const { closeLiabilityModal } = useModal()

	return (
		<Form action={createLiability}>
			<FormHeader
				title="Add Liability"
				description="Track a debt, balance, or recurring liability."
				onClose={closeLiabilityModal}
			/>

			<FormField
				label="Liability name"
				htmlFor="liabilityName">
				<FormInput
					id="liabilityName"
					name="liabilityName"
					type="text"
					placeholder="e.g. Chase Mortgage"
					required
				/>
			</FormField>

			<FormField
				label="Liability type"
				htmlFor="liabilityType">
				<FormSelect
					id="liabilityType"
					name="liabilityType"
					defaultValue=""
					required>
					<option
						value=""
						disabled>
						Select...
					</option>

					{LIABILITY_TYPES.map((liability) => (
						<option
							key={liability.value}
							value={liability.value}>
							{liability.label}
						</option>
					))}
				</FormSelect>
			</FormField>

			<FormField
				label="Current balance"
				htmlFor="currentBalance">
				<FormInput
					id="currentBalance"
					name="currentBalance"
					type="number"
					min="0"
					step="0.01"
					placeholder="0.00"
					required
				/>
			</FormField>

			<FormField
				label="Original amount"
				htmlFor="originalAmount"
				optional>
				<FormInput
					id="originalAmount"
					name="originalAmount"
					type="number"
					min="0.01"
					step="0.01"
					placeholder="0.00"
				/>
			</FormField>

			<FormField
				label="Monthly payment"
				htmlFor="monthlyPayment"
				optional>
				<FormInput
					id="monthlyPayment"
					name="monthlyPayment"
					type="number"
					min="0.01"
					step="0.01"
					placeholder="0.00"
				/>
			</FormField>

			<FormField
				label="APR"
				htmlFor="apr"
				optional>
				<FormInput
					id="apr"
					name="apr"
					type="number"
					min="0"
					max="100"
					step="0.01"
					placeholder="0.00"
				/>
			</FormField>

			<FormActions>
				<FormButton
					type="button"
					variant="secondary"
					onClick={closeLiabilityModal}>
					Cancel
				</FormButton>

				<FormButton type="submit">Save liability</FormButton>
			</FormActions>
		</Form>
	)
}

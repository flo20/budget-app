import { createLiability } from '@/app/actions/liabilities'
import { LIABILITY_TYPES } from '@/lib/constants/liability-types'

export default function LiabilitiesForm() {
	return (
		<form action={createLiability}>
			<input
				name="liabilityName"
				type="text"
				required
			/>

			<select
				name="liabilityType"
				required>
				<option
					value=""
					disabled>
					Select...
				</option>
				{LIABILITY_TYPES.map((liability) => (
					<option
						value={liability.value}
						key={liability.value}>
						{liability.label}
					</option>
				))}
			</select>

			<input
				name="currentBalance"
				type="number"
				min="0"
				step="0.01"
				required
			/>

			<input
				name="originalAmount"
				type="number"
				min="0.01"
				step="0.01"
			/>

			<input
				name="monthlyPayment"
				type="number"
				min="0.01"
				step="0.01"
			/>

			<input
				name="apr"
				type="number"
				min="0"
				max="100"
				step="0.01"
			/>
			<button type="submit">Save Liability</button>
		</form>
	)
}

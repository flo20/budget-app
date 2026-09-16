'use client'

import {useState} from "react"

import { useModal } from "@/app/providers/GlobalProvider"
import { createPinPayment } from "@/app/actions/pins"
import { localDate } from "@/lib/utils/date"

import {
	Form,
	FormHeader,
	FormField,
	FormInput,
	FormActions,
	FormButton,
} from '@/components/Form'

import styles from './PinnedPayment.module.scss'

export default function PinnedPaymentForm () {
    const [dueDate, setDueDate] = useState(() => localDate())

    const {closePinnedModal} = useModal()

return (
	<Form action={createPinPayment}>
		<FormHeader
			title="Pinned Payment"
			description="Add an upcoming payment to your pinned list."
			onClose={closePinnedModal}
		/>

		<FormField
			label="Label"
			htmlFor="label">
			<FormInput
				id="label"
				type="text"
				name="label"
				placeholder="e.g. Rent"
				required
			/>
		</FormField>

		<FormField
			label="Amount"
			htmlFor="amount">
			<FormInput
				id="amount"
				name="amount"
				type="number"
				min="0.01"
				step="0.01"
				placeholder="0.00"
				required
			/>
		</FormField>

		<FormField
			label="Due date"
			htmlFor="dueDate">
			<FormInput
				id="dueDate"
				name="dueDate"
				type="date"
				value={dueDate}
				onChange={(event) => setDueDate(event.target.value)}
				required
			/>
		</FormField>

		<label
			htmlFor="isRecurringMonthly"
			className={styles.checkboxField}>
			<input
				id="isRecurringMonthly"
				name="isRecurringMonthly"
				type="checkbox"
			/>

			<span
				className={styles.checkboxVisual}
				aria-hidden="true"
			/>

			<span className={styles.checkboxContent}>
				<strong>Recurring monthly</strong>
				<small>Automatically repeat this payment every month.</small>
			</span>
		</label>

		<FormActions>
			<FormButton
				type="button"
				variant="secondary"
				onClick={closePinnedModal}>
				Cancel
			</FormButton>

			<FormButton type="submit">Pin payment</FormButton>
		</FormActions>
	</Form>
)
}

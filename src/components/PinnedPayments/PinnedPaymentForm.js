'use client'

import {useState} from "react"

import { X } from 'lucide-react'

import { useModal } from "@/app/providers/GlobalProvider"
import { createPinPayment } from "@/app/actions/pins"
import { localDate } from "@/lib/utils/date"

import styles from './PinnedPayment.module.scss'

export default function PinnedPaymentForm () {
    const [dueDate, setDueDate] = useState(() => localDate())

    const {closePinnedModal} = useModal()

return (
	<div className={styles.formWrapper}>
		<header className={styles.dialogHeading}>
			<div>
				<h4>Pinned Payment</h4>
				<p>Add an upcoming payment to your pinned list.</p>
			</div>
			<button
				type="button"
				className={styles.closeButton}
				onClick={closePinnedModal}
				aria-label="Close">
				<X />
			</button>
		</header>
		<form
			action={createPinPayment}
			className={styles.form}>
			<p>Record an income or expense. </p>

			<div className={styles.field}>
				<label htmlFor="label">Label</label>
				<input
					id="label"
					type="text"
					name="label"
					placeholder="e.g. Rent"
					required
				/>
			</div>

			<div className={styles.field}>
				<label htmlFor="amount">Amount</label>
				<input
					id="amount"
					name="amount"
					type="number"
					min="0.01"
					step="0.01"
					required
				/>
			</div>

			<div className={styles.field}>
				<label htmlFor="dueDate">Due date</label>

				<input
					id="dueDate"
					name="dueDate"
					type="date"
					value={dueDate}
					onChange={(event) => setDueDate(event.target.value)}
				/>
			</div>

			<label
				htmlFor="isRecurringMonthly"
				className={styles.checkboxField}>
				<input
					id="isRecurringMonthly"
					name="isRecurringMonthly"
					type="checkbox"
				/>
				<span className={styles.checkboxVisual} />

				<span>
					<strong>Recurring monthly</strong>
					<small>Automatically repeat this payment every month.</small>
				</span>
			</label>
			<div className={styles.actions}>
				<button
					type="button"
					className={styles.cancelButton}
					onClick={closePinnedModal}>
					Cancel
				</button>

				<button
					type="submit"
					className={styles.submitButton}>
					Pin payment
				</button>
			</div>
		</form>
	</div>
)
}

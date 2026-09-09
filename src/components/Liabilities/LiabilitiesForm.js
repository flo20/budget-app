'use client'

import { X } from 'lucide-react'

import { createLiability } from '@/app/actions/liabilities'
import { LIABILITY_TYPES } from '@/lib/constants/liability-types'
import { useModal } from '@/app/providers/GlobalProvider'

import styles from './Liabilities.module.scss'

export default function LiabilitiesForm() {
	const { closeLiabilityModal } = useModal()

	return (
		<div className={styles.formWrapper}>
			<header className={styles.dialogHeading}>
				<div>
					<h4>Add Liability</h4>
					<p>Track a debt, balance, or recurring liability.</p>
				</div>

				<button
					type="button"
					className={styles.closeButton}
					onClick={closeLiabilityModal}
					aria-label="Close">
					<X />
				</button>
			</header>

			<form
				action={createLiability}
				className={styles.form}>
				<div className={styles.field}>
					<input
						id="liabilityName"
						name="liabilityName"
						type="text"
						placeholder="e.g. Chase Mortgage"
						required
					/>
				</div>

				<div className={styles.field}>
					<label htmlFor="liabilityType">Liability type</label>
					<select
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
								value={liability.value}
								key={liability.value}>
								{liability.label}
							</option>
						))}
					</select>
				</div>

				<div className={styles.field}>
					<label htmlFor="currentBalance">Current balance</label>

					<input
						id="currentBalance"
						name="currentBalance"
						type="number"
						min="0"
						step="0.01"
						placeholder="0.00"
						required
					/>
				</div>

				<div className={styles.field}>
					<label htmlFor="originalAmount">
						Original amount
						<span>Optional</span>
					</label>

					<input
						id="originalAmount"
						name="originalAmount"
						type="number"
						min="0.01"
						step="0.01"
						placeholder="0.00"
					/>
				</div>

				<div className={styles.field}>
					<label htmlFor="monthlyPayment">
						Monthly payment
						<span>Optional</span>
					</label>

					<input
						id="monthlyPayment"
						name="monthlyPayment"
						type="number"
						min="0.01"
						step="0.01"
						placeholder="0.00"
					/>
				</div>

				<div className={styles.field}>
					<label htmlFor="apr">
						APR
						<span>Optional</span>
					</label>

					<input
						id="apr"
						name="apr"
						type="number"
						min="0"
						max="100"
						step="0.01"
						placeholder="0.00"
					/>
				</div>

				<div className={styles.actions}>
					<button
						type="button"
						className={styles.cancelButton}
						onClick={closeLiabilityModal}>
						Cancel
					</button>

					<button
						type="submit"
						className={styles.submitButton}>
						Save liability
					</button>
				</div>
			</form>
		</div>
	)
}

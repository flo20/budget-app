'use client'

import { useFormAction } from '../hooks/useFormActions'
import {
	markPinnedPaymentPaid,
	undoPinnedPaymentPaid,
	deletePinnedPayment,
} from '@/app/actions/pins'

import { getPaymentStatus } from '@/lib/constants/pins'

import { formatAmount, formatDate } from '@/lib/utils/format'

import { Check, Trash2, Undo2 } from 'lucide-react'

import { Form, FormButton, FormError } from '@/components/Form'

import styles from './PinnedPayment.module.scss'

export default function PinnedPaymentRow({ payment }) {
	const {
		formAction: markPaidAction,
		isPending: isMarkingPaid,
		error: markPaidError,
	} = useFormAction(markPinnedPaymentPaid)

	const {
		formAction: undoPaidAction,
		isPending: isUndoing,
		error: undoError,
	} = useFormAction(undoPinnedPaymentPaid)

	const {
		formAction: deleteAction,
		isPending: isDeleting,
		error: deleteError,
	} = useFormAction(deletePinnedPayment)

	const status = getPaymentStatus(payment.due_date)
	const isPaid = payment.is_paid

	return (
		<article
			className={`${styles.payment} ${styles[status.type]} ${
				isPaid ? styles.paid : ''
			}`}>
			<div className={styles.paymentTop}>
				<h3>{payment.label}</h3>
				<strong>{formatAmount(payment.amount)}</strong>
			</div>

			<div className={styles.meta}>
				<span>{formatDate(payment.due_date).toUpperCase()}</span>

				{!isPaid && (
					<>
						<span className={styles.dot}>·</span>
						<span className={styles.status}>{status.label}</span>
					</>
				)}

				{payment.is_recurring_monthly && (
					<>
						<span className={styles.dot}>·</span>
						<span>Monthly</span>
					</>
				)}
			</div>

			<div className={styles.actions}>
				{isPaid ? (
					<Form action={undoPaidAction}>
						<input
							type="hidden"
							name="paymentId"
							value={payment.id}
						/>

						<FormButton
							type="submit"
							className={styles.undoButton}
							disabled={isUndoing}>
							<Undo2 />

							<span>{isUndoing ? 'Undoing...' : 'Undo'}</span>
						</FormButton>
					</Form>
				) : (
					<Form action={markPaidAction}>
						<input
							type="hidden"
							name="paymentId"
							value={payment.id}
						/>

						<FormButton
							type="submit"
							className={styles.paidButton}
							disabled={isMarkingPaid}>
							<Check />

							<span>{isMarkingPaid ? 'Updating...' : 'Mark paid'}</span>
						</FormButton>
					</Form>
				)}

				<Form action={deleteAction}>
					<input
						type="hidden"
						name="paymentId"
						value={payment.id}
					/>

					<FormButton
						type="submit"
						className={styles.deleteButton}
						disabled={isDeleting}
						aria-label={`Delete ${payment.label}`}>
						<Trash2 />
					</FormButton>
				</Form>
			</div>

			<FormError error={markPaidError || undoError || deleteError} />
		</article>
	)
}

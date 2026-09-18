'use client'

import { useModal, useMount } from '@/app/providers/GlobalProvider'
import { formatAmount, formatDate } from '@/lib/utils/format'
import {
	markPinnedPaymentPaid,
	undoPinnedPaymentPaid,
	deletePinnedPayment,
} from '@/app/actions/pins'

import { PinIcon, Check, Trash2, Undo2 } from 'lucide-react'

import Modal from '../Modal/Modal'
import PinnedPaymentForm from './PinnedPaymentForm'

import styles from './PinnedPayment.module.scss'

function getPaymentStatus(dueDate) {
	const today = new Date()
	today.setHours(0, 0, 0, 0)

	const due = new Date(`${dueDate}T00:00:00`)

	const difference = Math.round(
		(due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
	)

	if (difference < 0) {
		return {
			type: 'overdue',
			label: `${Math.abs(difference)}D OVERDUE`,
		}
	}

	if (difference === 0) {
		return {
			type: 'today',
			label: 'DUE TODAY',
		}
	}

	return {
		type: 'upcoming',
		label: `IN ${difference}D`,
	}
}

export default function PinnedPaymentClient({ pinnedPayments = [] }) {
	const { showPinnedModal, openPinnedModal, closePinnedModal } = useModal()
	const { mounted } = useMount()

	return (
		<>
			<section
				id="pinned"
				className={styles.container}>
				<header className={styles.header}>
					<h5>Pinned Payments</h5>
					<button
						type="button"
						className={styles.pinButton}
						onClick={openPinnedModal}>
						<PinIcon strokeWidth={1.5} />
						Pin
					</button>
				</header>

				{pinnedPayments.length === 0 ? (
					<p className={styles.emptyState}>No pinned payments yet.</p>
				) : (
					<div className={styles.paymentList}>
						{pinnedPayments.map((payment) => {
							const status = getPaymentStatus(payment.due_date)
							const isPaid = payment.is_paid

							return (
								<article
									key={payment.id}
									className={`${styles.payment} ${styles[status.type]} ${isPaid ? styles.paid : ''}`}>
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
											<form action={undoPinnedPaymentPaid}>
												<input
													type="hidden"
													name="paymentId"
													value={payment.id}
												/>

												<button
													type="submit"
													className={styles.undoButton}>
													<Check />
													<span>Undo</span>
												</button>
											</form>
										) : (
											<form action={markPinnedPaymentPaid}>
												<input
													type="hidden"
													name="paymentId"
													value={payment.id}
												/>

												<button
													type="submit"
													className={styles.paidButton}>
													<Undo2 />
													<span>Paid</span>
												</button>
											</form>
										)}
										<form action={deletePinnedPayment}>
											<input
												type="hidden"
												name="paymentId"
												value={payment.id}
											/>

											<button
												type="submit"
												className={styles.deleteButton}
												aria-label={`Delete ${payment.label}`}>
												<Trash2 />
											</button>
										</form>
									</div>
								</article>
							)
						})}
					</div>
				)}
			</section>
			<Modal
				showModal={showPinnedModal}
				closeModal={closePinnedModal}
				mounted={mounted}>
				<PinnedPaymentForm />
			</Modal>
		</>
	)
}

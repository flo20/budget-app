'use client'

import { useModal, useMount } from '@/app/providers/GlobalProvider'
import { formatAmount, formatDate } from '@/lib/utils/format'

import { PinIcon, Check, Trash2 } from 'lucide-react'

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
					<h4>Pinned Payment</h4>
					<button
						type="button"
						className={styles.pinButton}
						onClick={openPinnedModal}>
						<PinIcon
							size={16}
							strokeWidth={0.9}
						/>
						Pin
					</button>
				</header>

				{pinnedPayments.length === 0 ? (
					<p className={styles.emptyState}>No pinned payments yet.</p>
				) : (
					<div className={styles.paymentList}>
						{pinnedPayments.map((payment) => {
							const status = getPaymentStatus(payment.due_date)
							return (
								<article
									key={payment.id}
									className={`${styles.payment} ${styles[status.type]}`}>
									<div className={styles.paymentTop}>
										<h3>{payment.label}</h3>
										<strong>{formatAmount(payment.amount)}</strong>
									</div>

									<div className={styles.meta}>
										<span>{formatDate(payment.due_date).toUpperCase()}</span>

										<span className={styles.dot}>·</span>

										<span className={styles.status}>{status.label}</span>

										{payment.is_recurring_monthly && (
											<>
												<span className={styles.dot}>·</span>
												<span>Monthly</span>
											</>
										)}
									</div>
									<div className={styles.actions}>
										<button
											type="button"
											className={styles.paidButton}>
											<Check />
											<span>Paid</span>
										</button>

										<button
											type="button"
											className={styles.deleteButton}
											aria-label={`Delete ${payment.label}`}>
											<Trash2 />
										</button>
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

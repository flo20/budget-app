'use client'

import { useModal, useMount } from '@/app/providers/GlobalProvider'

import { PinIcon } from 'lucide-react'

import Modal from '../Modal/Modal'
import PinnedPaymentForm from './PinnedPaymentForm'
import PinnedPaymentRow from './PinnedPaymenRow'

import styles from './PinnedPayment.module.scss'

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
						{pinnedPayments.map((payment) => (
							<PinnedPaymentRow
								key={payment.id}
								payment={payment}
							/>
						))}
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

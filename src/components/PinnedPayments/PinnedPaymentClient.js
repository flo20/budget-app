'use client'

import { useModal, useMount } from '@/app/providers/GlobalProvider'

import Modal from '../Modal/Modal'
import PinnedPaymentForm from './PinnedPaymentForm'

import styles from './PinnedPayment.module.scss'

export default function PinnedPaymentClient({ pinnedPayments = [] }) {
	const { showPinnedModal, openPinnedModal, closePinnedModal } = useModal()
	const { mounted } = useMount()

	return (
		<>
			<section
				id="pinned"
				className={styles.container}>
				<header>
					<h4>Pinned Payment</h4>
					<button onClick={openPinnedModal}>Pin Icon</button>
				</header>

				{pinnedPayments.length === 0 ? (
					<p>No pinned payments yet.</p>
				) : (
					<div>
						{pinnedPayments.map((payment) => (
							<article key={payment.id}>
								<h3>{payment.label}</h3>

								<p>
									{Number(payment.amount).toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD',
									})}
								</p>

								<p>{payment.due_date}</p>

								{payment.is_recurring_monthly && <p>Monthly</p>}
							</article>
						))}
					</div>
				)}
			</section>
			<Modal
				showModal={showPinnedModal}
				closeModal={closePinnedModal}
				mounted={mounted}>
				<PinnedPaymentForm closeModal={closePinnedModal} />
			</Modal>
		</>
	)
}

'use client'

import { useModal, useMount } from '@/app/providers/GlobalProvider'

import Modal from './Modal/Modal'
import PinnedPaymentForm from './PinnedPaymentForm'

import styles from './PinnedPayment.module.scss'

export default function PinnedPayment() {
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
				<div>
					<h4>Pinned Title</h4>
					<p>$600</p>
				</div>

				<div>
					<p>Pinned date</p>
					<p>Due date</p>
					<p>Monthly/Yearly</p>
				</div>
				<div>
					<button>Paid</button>
					<button>Delete</button>
				</div>
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

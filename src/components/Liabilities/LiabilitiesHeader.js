'use client'

import { Plus } from 'lucide-react'

import { useModal, useMount } from '@/app/providers/GlobalProvider'
import LiabilitiesForm from './LiabilitiesForm'
import Modal from '../Modal/Modal'

import styles from './Liabilities.module.scss'

export default function LiabilitiesHeader() {
	const { showLiabilityModal, openLiabilityModal, closeLiabilityModal } =
		useModal()
	const { mounted } = useMount()

	return (
		<>
			<header className={styles.header}>
				<h5>Liabilities</h5>
				<button
					type="button"
					className={styles.addButton}
					onClick={openLiabilityModal}>
					<Plus />
					<span>Liability</span>
				</button>
			</header>
			<Modal
				showModal={showLiabilityModal}
				closeModal={closeLiabilityModal}
				mounted={mounted}>
				<LiabilitiesForm />
			</Modal>
		</>
	)
}

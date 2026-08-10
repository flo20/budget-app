'use client'

import { useModal, useMount } from '@/app/providers/GlobalProvider'
import LiabilitiesForm from './LiabilitiesForm'
import Modal from '../Modal/Modal'


export default function LiabilitiesHeader() {
	const { showLiabilityModal, openLiabilityModal, closeLiabilityModal } =
		useModal()
	const { mounted } = useMount()

	return (
		<>
			<header>
				<h2>Liabilities</h2>
				<button onClick={openLiabilityModal}>Liability</button>
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

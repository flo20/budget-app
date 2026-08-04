'use client'

import { useModal, useMount } from '@/app/providers/GlobalProvider'
import AssetForm from './AssetForm'
import Modal from '../Modal/Modal'

import styles from './AssetInventory.module.scss'

export default function AssetCard() {
	const { showAssetModal, openAssetModal, closeAssetModal } = useModal()
	const { mounted } = useMount()

	return (
		<>
			<header>
				<h2>Asset Inventory</h2>
				<button onClick={openAssetModal}>Asset</button>
			</header>
			<Modal
				showModal={showAssetModal}
				closeModal={closeAssetModal}
				mounted={mounted}>
				<AssetForm closeAssetModal={closeAssetModal} />
			</Modal>
		</>
	)
}

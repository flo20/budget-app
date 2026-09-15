'use client'

import { useModal, useMount } from '@/app/providers/GlobalProvider'
import { Plus } from 'lucide-react'

import AssetForm from './AssetForm'
import Modal from '../Modal/Modal'

import styles from './AssetAllocation.module.scss'

export default function AssetHeader() {
	const { showAssetModal, openAssetModal, closeAssetModal } = useModal()
	const { mounted } = useMount()

	return (
		<>
			<header className={styles.header}>
				<h2>Asset Allocation</h2>
				<button
					type="button"
					className={styles.addButton}
					onClick={openAssetModal}>
					<Plus />
					<span>Asset</span>
				</button>
			</header>
			<Modal
				showModal={showAssetModal}
				closeModal={closeAssetModal}
				mounted={mounted}>
				<AssetForm />
			</Modal>
		</>
	)
}

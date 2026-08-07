'use client'

import { useEffect } from "react"
import { createPortal } from 'react-dom'

import styles from "./Modal.module.scss"

export default function Modal({ showModal, closeModal, mounted, children }) {
	useEffect(() => {
		const OriginalOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = OriginalOverflow
		}
	}, [])

	useEffect(() => {
		document.body.style.overflow = 'hidden'
		function handleKeydown(e) {
			if (e.key === 'Escape') {
				closeModal()
			}
		}

		window.addEventListener('keydown', handleKeydown)
		return () => {
			document.body.style.overflow = ' '
			window.removeEventListener('keydown', handleKeydown)
		}
	}, [closeModal])

	if (!showModal || !mounted) return null
	return createPortal(
		<div
			onClick={closeModal}
			className={styles.overlay}>
			<div
				onClick={(e) => e.stopPropagation()}
				className={styles.dialog}
				role="dialog"
				aria-labelledby="modal-title"
				aria-modal="true">
				{children}
			</div>
		</div>,
		document.body,
	)
}


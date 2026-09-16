'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

import styles from './Modal.module.scss'

export default function Modal({ showModal, closeModal, mounted, children }) {
	useEffect(() => {
		if (!showModal) return

		const OriginalOverflow = document.body.style.overflow
        const originalHtmlOverflow = document.documentElement.style.overflow

		document.body.style.overflow = 'hidden'
        document.documentElement.style.overflow = 'hidden'

		function handleKeydown(event) {
			if (event.key === 'Escape') {
				closeModal()
			}
		}

		window.addEventListener('keydown', handleKeydown)

		return () => {
			document.body.style.overflow = OriginalOverflow
            document.documentElement.style.overflow = originalHtmlOverflow

			window.removeEventListener('keydown', handleKeydown)
		}
	}, [showModal, closeModal])

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

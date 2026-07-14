'use client'

import { useState, useEffect } from 'react'
import { useTheme, useModal } from '@/app/providers/ThemeProvider'
import styles from './NavBar.module.scss'
import NewEntryForm from './NewEntryForm'
import Modal from './Modal/Modal'

export default function NavBar() {
	const { theme, toggleTheme } = useTheme()
	const { showModal, showEntryModal, closeEntryModal } = useModal()
	const [mounted, setMounted] = useState(false)

	// eslint-disable-next-line react-hooks/set-state-in-effect
	useEffect(() => setMounted(true), [])

	return (
		<>
			<nav className={styles.flex}>
				<ul>
					<a className="text-3xl font-bold">Logo</a>
				</ul>
				<ul className={styles.flexMainNav}>
					<li>
						<a href="#dashboard">Dashboard</a>
					</li>
					<li>
						<a href="#pinned">Pinned</a>
					</li>
					<li>
						<a href="#assets">Assets</a>
					</li>
					<li>
						<a href="#ledger">Ledger</a>
					</li>
				</ul>
				<ul>
					<button onClick={toggleTheme}>
						{mounted ? (theme === 'light' ? 'Dark Mode' : 'Light Mode') : null}
					</button>
					<button
						onClick={showEntryModal}
						id="modal-title">
						New Entry
					</button>
				</ul>
			</nav>
			<Modal
				showModal={showModal}
				closeModal={closeEntryModal}
				mounted={mounted}>
				<NewEntryForm closeModal={closeEntryModal} />
			</Modal>
		</>
	)
}

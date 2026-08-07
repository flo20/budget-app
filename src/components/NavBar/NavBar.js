'use client'

import { useEffect } from 'react'
import { useTheme, useModal, useMount } from '@/app/providers/GlobalProvider'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

import NewEntryForm from '../NewEntry/NewEntryForm'
import Modal from '../Modal/Modal'

import styles from './NavBar.module.scss'

export default function NavBar() {
	const { theme, toggleTheme } = useTheme()
	const { showEntryModal, openEntryModal, closeEntryModal } = useModal()
	const { mounted, mountDoc } = useMount()

	const router = useRouter()
	const supabase = createClient()

	async function handleLogout() {
		await supabase.auth.signOut()
		router.push('/signin')
		router.refresh()
	}

	useEffect(mountDoc, [mountDoc])

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
						onClick={openEntryModal}
						id="modal-title">
						New Entry
					</button>
				</ul>
				<ul>
					<button onClick={handleLogout}>Log out</button>
				</ul>
			</nav>
			<Modal
				showModal={showEntryModal}
				closeModal={closeEntryModal}
				mounted={mounted}>
				<NewEntryForm closeModal={closeEntryModal} />
			</Modal>
		</>
	)
}

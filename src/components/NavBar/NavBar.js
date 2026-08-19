'use client'

import { useEffect } from 'react'
import { useTheme, useModal, useMount } from '@/app/providers/GlobalProvider'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { SunIcon, MoonIcon } from 'lucide-react'

import NewEntryForm from '../NewEntry/NewEntryForm'
import Modal from '../Modal/Modal'
import Profile from './Profile'

import styles from './NavBar.module.scss'

export default function NavBar({user}) {
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
						<a href="#dashboard">Overview</a>
					</li>
					<li>
						<a href="#plan">Plan</a>
					</li>
					<li>
						<a href="#savings">Accounts</a>
					</li>
					<li>
						<a href="#activity">Activity</a>
					</li>
				</ul>
				<ul>
					<button
						onClick={openEntryModal}
						id="modal-title">
						New Entry
					</button>
					<button onClick={toggleTheme}>
						{mounted ? theme === 'light' ? <MoonIcon /> : <SunIcon /> : null}
					</button>
					<Profile handleLogout={handleLogout} user={user}/>
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

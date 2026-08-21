'use client'

import { useEffect } from 'react'
import { useTheme, useModal, useMount } from '@/app/providers/GlobalProvider'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { SunIcon, MoonIcon } from 'lucide-react'

import Link from 'next/link'
import NewEntryForm from '../NewEntry/NewEntryForm'
import Modal from '../Modal/Modal'
import Profile from './Profile'

import styles from './NavBar.module.scss'

export default function NavBar({ user }) {
	const isAuthenticated = Boolean(user?.id)

	const { theme, toggleTheme } = useTheme()
	const { showEntryModal, openEntryModal, closeEntryModal } = useModal()
	const { mounted, mountDoc } = useMount()

	const router = useRouter()
	const supabase = createClient()

	async function handleLogout() {
		const { error } = await supabase.auth.signOut()
		if (error) {
			console.error('Unable to sign out:', error)
			return
		}
		router.replace('/')
		router.refresh()
	}

	useEffect(mountDoc, [mountDoc])

	return (
		<>
			<nav className={styles.flex}>
				<ul>
					<div className="text-3xl font-bold">Logo</div>
				</ul>
				{isAuthenticated ? (
					<>
						<ul className={styles.flexMainNav}>
							<li>
								<a href="#overview">Overview</a>
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
								{mounted ? (
									theme === 'light' ? (
										<MoonIcon />
									) : (
										<SunIcon />
									)
								) : null}
							</button>
							<Profile
								user={user}
								handleLogout={handleLogout}
							/>
						</ul>
					</>
				) : (
					<div className="flex items-center gap-6">
						<button onClick={toggleTheme}>
							{mounted ? theme === 'light' ? <MoonIcon /> : <SunIcon /> : null}
						</button>

						<Link
							href="/signin"
							className="font-mono text-sm tracking-[0.18em] text-white">
							SIGN IN
						</Link>

						<Link
							href="/signup"
							className="rounded-md bg-blue-500 px-6 py-3 font-mono text-sm tracking-[0.18em] text-black">
							GET STARTED
						</Link>
					</div>
				)}
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

'use client'

import { useEffect } from 'react'
import { useTheme, useModal, useMount } from '@/app/providers/GlobalProvider'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { SunIcon, MoonIcon } from 'lucide-react'

import Link from 'next/link'
import NewEntryForm from '../NewEntry/NewEntryForm'
import Modal from '../Modal/Modal'
import Profile from './Profile'

import styles from './NavBar.module.scss'
import Logo from '../Logo/Logo'

export default function NavBar({ user }) {
	const isAuthenticated = Boolean(user?.id)
	const pathname = usePathname()

	const { theme, toggleTheme } = useTheme()
	const { showEntryModal, openEntryModal, closeEntryModal } = useModal()
	const { mounted, mountDoc } = useMount()

	const router = useRouter()

	const isAuthPage = pathname === '/signin' || pathname === '/signup'

	async function handleLogout() {
		const supabase = createClient()
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
				<Link
					href="/"
					className={styles.brand}>
					<Logo />
				</Link>
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
						<div className={styles.actions}>
							<button
								onClick={openEntryModal}
								className={styles.newEntryButton}
								//id="modal-title"
							>
								<span>＋</span>
								New Entry
							</button>
							<div className={styles.actionDivider} />
							<button
								onClick={toggleTheme}
								className={styles.themeButton}
								aria-label="Toggle theme">
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
						</div>
					</>
				) : (
					<div className={styles.actions}>
						<button
							onClick={toggleTheme}
							className={styles.themeButton}
							aria-label="Toggle theme">
							{mounted ? theme === 'light' ? <MoonIcon /> : <SunIcon /> : null}
						</button>

						{!isAuthPage && (
							<>
								<Link
									href="/signin"
									className={styles.signButton}>
									SIGN IN
								</Link>

								<Link
									href="/signup"
									className={styles.startButton}>
									GET STARTED
								</Link>
							</>
						)}
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

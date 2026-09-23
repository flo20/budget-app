'use client'

import Link from 'next/link'

import { useEffect, useState } from 'react'
import { useTheme, useModal, useMount } from '@/app/providers/GlobalProvider'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

import { SunIcon, MoonIcon } from 'lucide-react'

import { NAV_ITEMS } from '@/lib/constants/navbar'

import NewEntryForm from '../NewEntry/NewEntryForm'
import Modal from '../Modal/Modal'
import Profile from './Profile'
import Logo from '../Logo/Logo'

import styles from './NavBar.module.scss'

export default function NavBar({ user }) {
	const [activeSection, setActiveSection] = useState('overview')
    
	const pathname = usePathname()
    const isAuthPage = pathname === '/signin' || pathname === '/signup'
	const isDashboardPage = pathname.startsWith('/dashboard')

	const { theme, toggleTheme } = useTheme()
	const { showEntryModal, openEntryModal, closeEntryModal } = useModal()
	const { mounted, mountDoc } = useMount()

	const router = useRouter()



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
			<nav className={styles.navbar}>
				<div className={styles.flex}>
					<Link
						href={isDashboardPage ? '/dashboard' : '/'}
						className={styles.brand}>
						<Logo />
					</Link>
					{isDashboardPage ? (
						<>
							<ul className={styles.flexMainNav}>
								{NAV_ITEMS.map((item) => (
									<li key={item.id}>
										<a
											href={`#${item.id}`}
											className={styles.navItem}
											data-active={activeSection === item.id ? '' : undefined}
											aria-current={
												activeSection === item.id ? 'page' : undefined
											}
											onClick={() => setActiveSection(item.id)}>
											{item.label}
										</a>
									</li>
								))}
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
								{mounted ? (
									theme === 'light' ? (
										<MoonIcon />
									) : (
										<SunIcon />
									)
								) : null}
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
				</div>
			</nav>
			{isDashboardPage && (
				<Modal
					showModal={showEntryModal}
					closeModal={closeEntryModal}
					mounted={mounted}>
					<NewEntryForm closeModal={closeEntryModal} />
				</Modal>
			)}
		</>
	)
}

'use client'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { LogOut } from 'lucide-react'

import styles from './NavBar.module.scss'

export default function Profile({ user, handleLogout }) {
	const initial = user.email?.[0]?.toUpperCase()
	return (
		<Popover>
			<PopoverTrigger className={styles.profileAvatar}>
				{initial}
			</PopoverTrigger>
			<PopoverContent
				align="end"
				sideOffset={6}
				className={styles.profilePopover}>
				<div className={styles.profileInfo}>
					<p className={styles.profileEmail}>{user.email}</p>
					<p className={styles.profileLabel}>HOUSEHOLD</p>
				</div>

				<button
					onClick={handleLogout}
					className={styles.logoutButton}>
					<LogOut />
					<span>Sign out</span>
				</button>
			</PopoverContent>
		</Popover>
	)
}

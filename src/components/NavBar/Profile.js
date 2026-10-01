'use client'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { LogOut } from 'lucide-react'

import styles from './NavBar.module.scss'

export default function Profile({ user, handleLogout }) {
	const isAnonymous = user?.is_anonymous
	const profile = isAnonymous
		? {
				name: 'Demo Account',
				email: 'demoaccount@test.com',
				avatar: 'D',
			}
		: {
				name: user?.user_metadata?.full_name,
				email: user?.email,
				avatar: user?.user_metadata?.avatar_url,
			}

	return (
		<Popover modal>
			<PopoverTrigger className={styles.profileAvatar}>
				{profile.avatar}
			</PopoverTrigger>
			<PopoverContent
				align="end"
				sideOffset={6}
				positionerClassName={styles.profilePopoverPositioner}
				className={styles.profilePopover}>
				<div className={styles.profileInfo}>
					<p className={styles.profileName}>{profile.name}</p>
					<p className={styles.profileEmail}>{profile.email}</p>
				</div>

				<button
					onClick={handleLogout}
					className={styles.logoutButton}>
					<LogOut />
					<span>{isAnonymous ? 'Exit demo' : 'Sign out'}</span>
				</button>
			</PopoverContent>
		</Popover>
	)
}

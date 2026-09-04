'use client'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

import styles from './NavBar.module.scss'

export default function Profile({ user, handleLogout }) {
	const initial = user.email?.[0]?.toUpperCase()
	return (
		<Popover>
			<PopoverTrigger className={styles.profileAvatar}>
				{initial}
			</PopoverTrigger>
			<PopoverContent
				align="center"
				sideOffset={16}>
				<p>{user.email}</p>
				<p>HOUSEHOLD</p>
				<button onClick={handleLogout}>Log out</button>
			</PopoverContent>
		</Popover>
	)
}

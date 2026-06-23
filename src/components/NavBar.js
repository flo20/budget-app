'use client'

import { useTheme } from '@/app/providers/ThemeProvider'
import styles from './NavBar.module.scss'

export default function NavBar() {
	const { theme, toggleTheme } = useTheme()

	return (
		<nav className={styles.flex}>
			<ul>
				<a>Logo</a>
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
					{theme === 'light' ? 'Dark Mode' : 'Light Mode'}{' '}
				</button>
				<button href="/newentry">New Entry</button>
			</ul>
		</nav>
	)
}

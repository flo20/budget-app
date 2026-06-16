import Link from 'next/link'

export default function NavBar() {
	return (
		<nav>
			<ul>
				<Link href="/">Logo</Link>
			</ul>
			<ul>
				<li>
					<Link href="#dashboard">Dashboard</Link>
				</li>
				<li>
					<Link href="#pinned">Pinned</Link>
				</li>
				<li>
					<Link href="#assets">Assets</Link>
				</li>
				<li>
					<Link href="#ledger">Ledger</Link>
				</li>
			</ul>
			<ul>
				<li>
					<button href="/newentry">New Entry</button>
				</li>
			</ul>
		</nav>
	)
}

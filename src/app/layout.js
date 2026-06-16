import NavBar from '@/components/NavBar'
import './globals.css'

export const metadata = {
	title: 'Budget App',
	description: 'Household budgeting app',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<NavBar />
				<main>{children}</main>
			</body>
		</html>
	)
}

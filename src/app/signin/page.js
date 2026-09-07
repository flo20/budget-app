'use client'

import NavBar from '@/components/NavBar/NavBar'
import SignIn from '@/components/Auth/SignIn/SignIn'

export default function SignInPage() {
	return (
		<main>
			<NavBar />
			<section className="pageContainer">
				<SignIn />
			</section>
		</main>
	)
}

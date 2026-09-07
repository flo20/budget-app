import NavBar from '@/components/NavBar/NavBar'
import SignUp from '@/components/Auth/SignUp/SignUp'

export default async function SignUpPage() {
	return (
		<main>
			<NavBar />
			<section className="pageContainer">
				<SignUp />
			</section>
		</main>
	)
}

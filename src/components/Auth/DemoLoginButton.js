import { signInAsDemo } from '@/app/actions/auth'

export default function DemoLoginButton() {
	return (
		<form action={signInAsDemo}>
			<button
				type="submit"
				className="rounded border py-2">
				Try Demo Account
			</button>
		</form>
	)
}

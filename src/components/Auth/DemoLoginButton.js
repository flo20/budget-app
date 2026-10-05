import { signInAsDemo } from '@/app/actions/auth'

import DemoSubmitButton from './DemoSubmitButton'

export default function DemoLoginButton() {
	return (
		<form action={signInAsDemo}>
			<DemoSubmitButton />
		</form>
	)
}

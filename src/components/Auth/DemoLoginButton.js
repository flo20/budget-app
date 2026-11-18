import { signInAsDemo } from '@/app/actions/auth'

import DemoSubmitButton from './DemoSubmitButton'

export default function DemoLoginButton({ className }) {
	return (
		<form
			action={signInAsDemo}
			className={className}>
			<DemoSubmitButton />
		</form>
	)
}

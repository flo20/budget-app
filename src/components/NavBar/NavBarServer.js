import { requireUserOptional } from '@/app/actions/auth'

import NavBar from './NavBar'

export default async function NavBarServer() {
	const user = await requireUserOptional()

	return <NavBar user={user} />
}

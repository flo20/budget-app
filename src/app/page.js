import HeroBanner from '@/components/HeroBanner/HeroBanner'
import NavbarServer from '@/components/NavBar/NavBarServer'

import '@/app/globals.css'

export default function Home() {
	return (
		<>
			<NavbarServer />
			<HeroBanner />
		</>
	)
}

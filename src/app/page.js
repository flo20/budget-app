import HeroBanner from '@/components/HeroBanner/HeroBanner'
import '@/app/globals.css'
import NavbarServer from '@/components/NavBar/NavBarServer'

export default function Home() {
	return (
		<>
			<NavbarServer />
			<HeroBanner />
		</>
	)
}

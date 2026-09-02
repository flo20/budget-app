import Image from "next/image"

export default function Logo() {
	return (
		<div>
			<Image
				src="/logo-light.svg"
				alt="Tally"
				width={120}
				height={40}
				priority
				className="logo-light object-contain object-left h-auto w-[180px]"
			/>

			<Image
				src="/logo-dark.svg"
				alt="Tally"
				width={120}
				height={40}
				priority
				className="logo-dark object-contain object-left h-auto w-[180px]"
			/>
		</div>
	)
}

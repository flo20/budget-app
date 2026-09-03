import Image from "next/image"

export default function Logo() {
	return (
		<div>
			<Image
				src="/logo-light.svg"
				alt="Tally"
				width={160}
				height={20}
				priority
				className="logo-light object-contain object-left h-auto w-[150px]"
			/>

			<Image
				src="/logo-dark.svg"
				alt="Tally"
				width={90}
				height={20}
				priority
				className="logo-dark object-contain object-left h-auto w-[150px]"
			/>
		</div>
	)
}

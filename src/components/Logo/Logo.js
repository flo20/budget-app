import Image from "next/image"

export default function Logo() {
	return (
		<div className="relative h-[52px] w-[200px] shrink-0">
			<Image
				src="/logo-light.svg"
				alt="Tally"
				width={160}
				height={45}
				priority
				className="logo-light object-contain object-left"
			/>

			<Image
				src="/logo-dark.svg"
				alt="Tally"
				width={160}
				height={45}
				priority
				className="logo-dark object-contain object-left"
			/>
		</div>
	)
}

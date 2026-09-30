import Image from "next/image"

export default function Logo() {
	return (
		<div className="tally-logo">
			<Image
				src="/logo-light.svg"
				alt="Tally"
				width={160}
				height={50}
				priority
				className="logo-light"
			/>

			<Image
				src="/logo-dark.svg"
				alt="Tally"
				width={90}
				height={50}
				priority
				className="logo-dark"
			/>
		</div>
	)
}

import Link from 'next/link'

export default function AccountItem({
	href,
	icon: Icon,
	title,
	subtitle,
	value,
}) {
	return (
		<Link
			href={href}
			className="group block px-8 first:pl-0 last:pr-0">
			<Icon className="mt-1 size-8 shrink-0 text-blue-400" />
			<div className="min-w-0 flex-1">
				<p className="text-xl font-medium text-zinc-100">{title}</p>

				<p className="mt-1 font-mono text-sm tracking-[0.12em] text-zinc-500">
					{subtitle}
				</p>

				<div className="mt-5 flex items-center gap-3">
					<p className="font-mono text-2xl font-medium text-zinc-100">
						{value}
					</p>

					<span className="text-2xl text-blue-400 transition-transform group-hover:translate-x-1">
						→
					</span>
				</div>
			</div>
		</Link>
	)
}

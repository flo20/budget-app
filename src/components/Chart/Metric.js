export default function Metric({ value, label, variant = 'default' }) {
	const valueStyles = {
		default: 'text-zinc-100',
		positive: 'text-emerald-400',
		negative: 'text-red-400',
	}
	return (
		<div className="min-w-0 flex min-h-[150px] flex-col items-center justify-center border-r border-[#29292e] last:border-r-0">
			<p
		className={`
        max-w-full
        whitespace-nowrap
        text-center
        font-mono
        font-semibold
        tracking-wide
        text-[clamp(1.25rem,2.2vw,2.25rem)]
        ${valueStyles[variant]}
        `}>
				{value}
			</p>

			<p className="mt-4 font-mono text-sm tracking-[0.18em] text-zinc-400">
				{label}
			</p>
		</div>
	)
}

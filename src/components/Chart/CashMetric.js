export default function CashMetric({ value, label, positive = false }) {
	return (
		<div className="flex min-h-[150px] flex-col items-center justify-center border-r border-[#29292e] last:border-r-0">
			<p
				className={`font-mono text-3xl font-semibold tracking-wide md:text-4xl ${
					positive ? 'text-emerald-400' : 'text-zinc-100'
				}`}>
				{value}
			</p>

			<p className="mt-4 font-mono text-sm tracking-[0.18em] text-zinc-400">
				{label}
			</p>
		</div>
	)
}

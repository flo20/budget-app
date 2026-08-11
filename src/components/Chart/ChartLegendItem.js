export default function ChartLegendItem({ color, label, dashed = false }) {
	return (
		<div className="flex items-center gap-3">
			<span
				className={`block w-9 border-t-[3px] ${dashed ? 'border-dashed' : ''}`}
				style={{ borderColor: color }}
			/>
			<span className="font-mono text-sm tracking-[0.15em] text-zinc-400">
				{label}
			</span>
		</div>
	)
}

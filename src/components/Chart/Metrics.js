import Metric from './Metric'

export default function Metrics({ items }) {
	return (
		<div className="grid grid-cols-2 border-b border-[#29292e] lg:grid-cols-4">
			{items.map((item) => (
				<Metric
					key={item.label}
					value={item.value}
					label={item.label}
					variant={item.variant}
				/>
			))}
		</div>
	)
}

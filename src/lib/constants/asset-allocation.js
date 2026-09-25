import {
	ChartNoAxesCombined,
	Banknote,
	ShieldCheck,
	House,
	Wallet,
} from 'lucide-react'

export const ASSET_TYPES = [
	'cash',
	'investment',
	'property',
	'retirement',
	'other',
]

export const ASSET_TYPE_DETAILS = {
	cash: {
		label: 'Cash',
		color: '#3b92ff',
	},
	investment: {
		label: 'Investment',
		color: '#00c995',
	},
	property: {
		label: 'Property',
		color: '#ffbd3e',
	},
	retirement: {
		label: 'Retirement',
		color: '#a879ff',
	},
	other: {
		label: 'Other',
		color: '#8f929b',
	},
}

export function getAssetIcon(category) {
	switch (category) {
		case 'cash':
			return <Banknote />
		case 'investment':
			return <ChartNoAxesCombined />
		case 'property':
			return <House />
		case 'retirement':
			return <ShieldCheck />
		case 'other':
			return <Wallet />
		default:
			return <Wallet />
	}
}

export function buildAllocationGradient(allocations) {
	let current = 0

	const segments = allocations.map((allocation) => {
		const start = current
		const end = current + allocation.percentage

		current = end

		return `${allocation.color} ${start}% ${end}%`
	})

	return `conic-gradient(${segments.join(', ')})`
}

import {
	House,
	ShoppingCart,
	Zap,
	Car,
	Clapperboard,
	WalletCards,
	Hospital,
	Toolbox,
	Tag,
	Briefcase,
	Laptop,
	TrendingUp,
	Utensils,
	HeartPulse,
	Film,
	ShoppingBag,
} from 'lucide-react'

const CATEGORY_ICONS = {
	house: House,
	'shopping-cart': ShoppingCart,
	zap: Zap,
	car: Car,
	clapperboard: Clapperboard,
	'wallet-cards': WalletCards,
	hospital: Hospital,
	toolbox: Toolbox,
	tag: Tag,
	briefcase: Briefcase,
	laptop: Laptop,
	'trending-up': TrendingUp,
	utensils: Utensils,
	'heart-pulse': HeartPulse,
	film: Film,
	'shopping-bag': ShoppingBag,
}

export function getCategoryIcon(iconName) {
	const Icon = CATEGORY_ICONS[iconName] ?? Tag

	return <Icon aria-hidden="true" />
}

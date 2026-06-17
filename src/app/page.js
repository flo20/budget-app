import AllocatedBudget from '@/components/AllocatedBudget'
import AssetInventory from '@/components/AssetInventory'
import BudgetSummary from '@/components/BudgetSummary'
import Graph from '@/components/Graph'
import LedgerStream from '@/components/LedgerStream'
import PinnedPayment from '@/components/PinnedPayment'
import QuickEntryButton from '@/components/QuickEntryButton'
import SubNav from '@/components/SubNav'

export default function Home() {
	return (
		<>
			<div>
				<SubNav />
				<BudgetSummary />
				<PinnedPayment />
				<Graph />
				<AllocatedBudget />
				<AssetInventory />
				<LedgerStream />
				<QuickEntryButton />
			</div>
		</>
	)
}

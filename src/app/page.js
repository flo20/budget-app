import AllocatedBudget from '@/components/AllocatedBudget'
import AssetInventory from '@/components/AssetInventory'
import BudgetSummary from '@/components/BudgetSummary'
import Graph from '@/components/Graph'
import LedgerStream from '@/components/LedgerStream'
import NavBar from '@/components/NavBar'
import NewEntryModal from '@/components/NewEntryForm'
import PinnedPayment from '@/components/PinnedPayment'
import QuickEntryButton from '@/components/QuickEntryButton'
import SubNav from '@/components/SubNav'

export default function Home() {
	return (
		<>
			<div>
                <NavBar/>
				<SubNav />
				<BudgetSummary />
				<BudgetSummary />
				<BudgetSummary />
				<BudgetSummary />
				<BudgetSummary />
				<BudgetSummary />
				<BudgetSummary />
				<BudgetSummary />
				<BudgetSummary />
				<BudgetSummary />
				<BudgetSummary />
				<BudgetSummary />
				<BudgetSummary />
				<BudgetSummary />
				<BudgetSummary />
				<PinnedPayment />
				<Graph />
				<AllocatedBudget />
				<AssetInventory />
				<AssetInventory />
				<AssetInventory />
				<AssetInventory />
				<AssetInventory />
				<AssetInventory />
				<AssetInventory />
				<AssetInventory />
				<AssetInventory />
				<AssetInventory />
				<AssetInventory />
				<AssetInventory />
				<AssetInventory />
				<AssetInventory />
				<AssetInventory />
				<LedgerStream />
				<LedgerStream />
				<LedgerStream />
				<LedgerStream />
				<LedgerStream />
				<LedgerStream />
				<QuickEntryButton />
                {/* <NewEntryModal/> */}
			</div>
		</>
	)
}

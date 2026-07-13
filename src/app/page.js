import AllocatedBudget from '@/components/AllocatedBudget'
import AssetInventory from '@/components/AssetInventory'
import BudgetSummary from '@/components/BudgetSummary'
import {Chart} from '@/components/Chart'
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
				<NavBar />
				<SubNav />
				<BudgetSummary />
				<Chart />
				<AllocatedBudget />
				<AssetInventory />
				<LedgerStream />
				<QuickEntryButton />
				{/* <NewEntryModal/> */}
			</div>
		</>
	)
}

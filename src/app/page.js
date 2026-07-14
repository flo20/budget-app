import AllocatedBudget from '@/components/AllocatedBudget'
import AssetInventory from '@/components/AssetInventory'
import BudgetAllocation from '@/components/BudgetAllocation'
import BudgetSummary from '@/components/BudgetSummary'
import {Chart} from '@/components/Chart'
import LedgerStream from '@/components/LedgerStream'
import NavBar from '@/components/NavBar'
import NewEntryModal from '@/components/NewEntryForm'
import { Notes } from '@/components/Notes'
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
                <BudgetAllocation/>
                <PinnedPayment/>
				<AllocatedBudget />
                <Notes/>
				<AssetInventory />
				<LedgerStream />
                <QuickEntryButton/>
			</div>
		</>
	)
}

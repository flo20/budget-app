import AllocatedBudget from '@/components/AllocatedBudget'
import AssetInventory from '@/components/AssetInventory'
import BudgetAllocation from '@/components/BudgetAllocation'
import BudgetSummary from '@/components/BudgetSummary'
import LedgerStream from '@/components/LedgerStream/LedgerStream'
import NavBar from '@/components/NavBar'
import PinnedPayment from '@/components/PinnedPayments/PinnedPayment'
import QuickEntryButton from '@/components/NewEntry/QuickEntryButton'
import SubNav from '@/components/SubNav'
import {Chart} from '@/components/Chart'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

import './globals.css'
import Notes from '@/components/BudgetNotes/Notes'

export default async function Home() {
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser();

    if(!user){
        redirect("/signup")
    }
    
	return (
		<>
			<div>
				<NavBar />
				<SubNav />
				<div className="contentWrapper">
					<div className="leftCol">
						<BudgetSummary />
						<PinnedPayment />
						<AllocatedBudget />
						<Notes />
					</div>
					<div className="rightCol">
						<Chart />
						<BudgetAllocation />
						<AssetInventory />
						<LedgerStream />
					</div>
				</div>
				<QuickEntryButton />
			</div>
		</>
	)
}

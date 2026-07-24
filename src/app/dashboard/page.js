import AllocatedBudget from '@/components/AllocatedBudget'
import AssetInventory from '@/components/AssetInventory'
import BudgetAllocation from '@/components/BudgetAllocation'
import BudgetSummary from '@/components/BudgetSummary'
import LedgerStream from '@/components/LedgerStream/LedgerStream'
import NavBar from '@/components/NavBar'
import PinnedPayment from '@/components/PinnedPayments/PinnedPayment'
import QuickEntryButton from '@/components/NewEntry/QuickEntryButton'
import SubNav from '@/components/SubNav'
import Notes from '@/components/BudgetNotes/Notes'
import {Chart} from '@/components/Chart'


import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { normalizeMonth } from '@/lib/utils/month'

import "@/app/globals.css"

export default async function Home({searchParams}) {
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser();

    const params = await searchParams
	const selectedMonth = normalizeMonth(params?.month)

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
						<Notes selectedMonth={selectedMonth} />
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

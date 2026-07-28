import AllocatedBudgets from '@/components/BudgetAllocation/AllocatedBudgets'
import AssetInventory from '@/components/AssetInventory'
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
import BudgetCategory from '@/components/BudgetAllocation/BudgetCategory'


export default async function DashBoard({searchParams}) {
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
						<BudgetCategory selectedMonth={selectedMonth} />
						<Notes selectedMonth={selectedMonth} />
					</div>
					<div className="rightCol">
						<Chart />
						<AssetInventory />
						<LedgerStream />
					</div>
				</div>
				<QuickEntryButton />
			</div>
		</>
	)
}

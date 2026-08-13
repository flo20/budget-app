import MonthlyPulse from '@/components/MonthlyPulse/MonthlyPulse'
import LedgerStream from '@/components/LedgerStream/LedgerStream'
import NavBar from '@/components/NavBar/NavBar'
import PinnedPayment from '@/components/PinnedPayments/PinnedPayment'
import QuickEntryButton from '@/components/NewEntry/QuickEntryButton'
import BudgetAllocation from '@/components/BudgetAllocation/BudgetAllocation'
import AssetAllocation from '@/components/AssetsAllocation/AssetAllocation'
import SubNav from '@/components/NavBar/SubNav'
import Notes from '@/components/BudgetNotes/Notes'
import SavingsGoals from '@/components/SavingsGoals/SavingsGoals'
import Liabilities from '@/components/Liabilities/Liabilities'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { normalizeMonth, toBudgetMonth } from '@/lib/utils/month'

import '@/app/globals.css'
import OutLook from '@/components/Chart/Outlook'

export default async function DashBoard({ searchParams }) {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const params = await searchParams
	const budgetMonth = toBudgetMonth(normalizeMonth(params?.month))

	if (!user) {
		redirect('/signup')
	}

	return (
		<>
			<div>
				<NavBar />
				<SubNav />
				<div className="contentWrapper">
					<div className="leftCol">
						<MonthlyPulse budgetMonth={budgetMonth} />
						<PinnedPayment />
						<Liabilities />
						<BudgetAllocation budgetMonth={budgetMonth} />
						<Notes budgetMonth={budgetMonth} />
					</div>
					<div className="rightCol">
						<OutLook budgetMonth={budgetMonth} />
						<SavingsGoals />
						<AssetAllocation />
						<LedgerStream />
					</div>
				</div>
				<QuickEntryButton />
			</div>
		</>
	)
}

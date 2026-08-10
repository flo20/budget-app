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
import { Chart } from '@/components/Chart/Chart'

import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { normalizeMonth } from '@/lib/utils/month'

import '@/app/globals.css'

export default async function DashBoard({ searchParams }) {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const params = await searchParams
	const selectedMonth = normalizeMonth(params?.month)

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
						<MonthlyPulse selectedMonth={selectedMonth} />
						<PinnedPayment />
                        <Liabilities/>
						<BudgetAllocation selectedMonth={selectedMonth} />
						<Notes selectedMonth={selectedMonth} />
					</div>
					<div className="rightCol">
						<Chart />
                        <SavingsGoals/>
						<AssetAllocation />
						<LedgerStream />
					</div>
				</div>
				<QuickEntryButton />
			</div>
		</>
	)
}

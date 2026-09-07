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
import OutLook from '@/components/Chart/Outlook'

import { redirect } from 'next/navigation'
import { requireUser } from '@/lib/auth/require-user'
import { normalizeMonth, toBudgetMonth } from '@/lib/utils/month'

import '@/app/globals.css'

export default async function DashBoard({ searchParams }) {
	const { user } = await requireUser()

	const params = await searchParams
	const budgetMonth = toBudgetMonth(normalizeMonth(params?.month))

	if (!user) {
		redirect('/signup')
	}

	return (
		<main id="#dashboard">
			<NavBar user={user} />
			<section className="pageContainer">
				<SubNav budgetMonth={budgetMonth} />
				<MonthlyPulse budgetMonth={budgetMonth} />
				<div className="contentWrapper">
					<div className="leftCol">
						<PinnedPayment />
						<Liabilities />
						<BudgetAllocation budgetMonth={budgetMonth} />
						<Notes budgetMonth={budgetMonth} />
					</div>
					<div className="rightCol">
						<OutLook budgetMonth={budgetMonth} />
						<SavingsGoals />
						<AssetAllocation />
						<LedgerStream budgetMonth={budgetMonth} />
					</div>
				</div>
			</section>
			<QuickEntryButton />
		</main>
	)
}

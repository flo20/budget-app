import BudgetSummary from '@/components/BudgetSummary'
import PinnedPayment from '@/components/PinnedPayment'
import SubNav from '@/components/SubNav'

export default function Home() {
	return (
		<>
			<div>
				<SubNav />
				<BudgetSummary />
				<PinnedPayment />
			</div>
		</>
	)
}

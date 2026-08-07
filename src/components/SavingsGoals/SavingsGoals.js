import { getSavingsGoals } from '@/lib/queries/savings-goals'

import GoalsSummary from './GoalsSummary'

export default async function SavingsGoals() {
    const goals = await getSavingsGoals()

    return (
		<>
			<GoalsSummary goals={goals} />
		</>
	)
}

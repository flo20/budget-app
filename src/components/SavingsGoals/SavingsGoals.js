
import { getSavingsGoals } from '@/lib/queries/savings-goals'
import GoalCard from './GoalCard'
import GoalsSummary from './GoalsSummary'

export default async function SavingsGoals() {
    const goals = await getSavingsGoals()
	// console.log("goals", goals)
	return (
		<>
			<GoalCard />
			<GoalsSummary goals={goals} />
		</>
	)
}

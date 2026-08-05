
import { getSavingsGoals } from '@/lib/queries/savings-goals'
import GoalCard from './GoalCard'

export default async function SavingsGoals() {
    const goals = await getSavingsGoals()
    // console.log("goals", goals)
	return <GoalCard goals ={goals}/>
}

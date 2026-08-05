import GoalCard from './GoalCard'
import ContributeButton from './ContributeButton'

export default async function GoalsSummary({ goals }) {
	// console.log("goals", goals)
	return (
		<>
			<div>
				{goals.map((goal) => (
					<div key={goal.id}>
						<h5> {goal.name}</h5>
						<h5> {goal.status}</h5>
						<h5> {goal.due_date}</h5>
						<h5> {goal.saved_amount}</h5>
						<h5> {goal.target_amount}</h5>
						<h5> {goal.completed_at}</h5>
                        <ContributeButton goal={goal}/>
					</div>
				))}
			</div>
		</>
	)
}

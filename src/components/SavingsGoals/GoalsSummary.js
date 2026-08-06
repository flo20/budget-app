'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils/currency'
import ContributeForm from './ContributeForm'

export default function GoalsSummary({ goals }) {
	const [contributionGoalId, setContributionGoalId] = useState(null)
	return (
		<>
			{goals.map((goal) => {
				const isContributing = contributionGoalId === goal.id

				return (
					<div key={goal.id}>
						<h5> {goal.name}</h5>
						<h5> {goal.status}</h5>
						<h5> {goal.due_date}</h5>
						<p>
							{formatCurrency(goal.saved_amount)}
							{' / '}
							{formatCurrency(goal.target_amount)}
						</p>
						<h5> {goal.completed_at}</h5>

						{isContributing ? (
							<ContributeForm
								goal={goal}
								closeForm={() => setContributionGoalId(null)}
							/>
						) : (
							<button
								type="button"
								onClick={() => {
									setContributionGoalId(goal.id)
								}}>
								+ Contribute
							</button>
						)}
					</div>
				)
			})}
		</>
	)
}

'use client'

import { useState } from 'react'

import { formatCurrency } from '@/lib/utils/format'
import { deleteSavedGoal } from '@/app/actions/savings-goals'
import { useModal, useMount } from '@/app/providers/GlobalProvider'

import ContributeForm from './ContributeForm'
import GoalForm from './GoalForm'
import Modal from '../Modal/Modal'

export default function GoalsSummary({ goals }) {
	const [contributionGoalId, setContributionGoalId] = useState(null)

	const { openGoalModal, closeGoalModal, showGoalModal } = useModal()
	const { mounted } = useMount()

	async function handleDelete(goal) {
		const result = await deleteSavedGoal(goal.id)

		if (!result?.success) {
			console.error(result.error)
			return
		}
	}
	return (
		<section>
			<header>
				<h4> Savings goal</h4>
				<button onClick={openGoalModal}>New Goal</button>
			</header>

			<Modal
				showModal={showGoalModal}
				closeModal={closeGoalModal}
				mounted={mounted}>
				<GoalForm />
			</Modal>
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
						<button
							type="button"
							onClick={() => handleDelete(goal)}>
							Delete
						</button>
					</div>
				)
			})}
		</section>
	)
}

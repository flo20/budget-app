'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils/currency'
import ContributeForm from './ContributeForm'
import { useModal } from '@/app/providers/GlobalProvider'
import Modal from '../Modal/Modal'

export default function ContributeButton({ goal }) {
	const [contributionGoalId, setContributionGoalId] = useState(null)
	const { openContributeModal } = useModal()

	const isContributing = contributionGoalId === goal.id


	return (
		<article key={goal.id}>
			<h3>{goal.name}</h3>

			<p>
				{formatCurrency(goal.saved_amount)}
				{' / '}
				{formatCurrency(goal.target_amount)}
			</p>

			{isContributing ? (
				<>
					<Modal>
						<ContributeForm
							goal={goal}
							// closeForm={() => setContributionGoalId(null)}
						/>
					</Modal>
				</>
			) : (
				<button
					type="button"
					onClick={() => {
						setContributionGoalId(goal.id)
						openContributeModal()
					}}>
					Contribute
				</button>
			)}
		</article>
	)
}

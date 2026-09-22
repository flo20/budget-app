'use client'

import { useState } from 'react'

import { Plus, Check, Trash2 } from 'lucide-react'

import { formatCurrency } from '@/lib/utils/format'
import { deleteSavedGoal } from '@/app/actions/savings-goals'
import { getGoalIcon, getProgress } from '@/lib/constants/saving-goals'
import { useModal, useMount } from '@/app/providers/GlobalProvider'

import ContributeForm from './ContributeForm'
import GoalForm from './GoalForm'
import Modal from '../Modal/Modal'
import ArchiveButton from './ArchiveButton'

import styles from './SavingsGoals.module.scss'

export default function GoalsSummary({ goals }) {
	const [contributionGoalId, setContributionGoalId] = useState(null)

	const { openGoalModal, closeGoalModal, showGoalModal } = useModal()
	const { mounted } = useMount()

	const activeGoals = goals.filter((goal) => goal.status === 'active')
	const completedGoals = goals.filter((goal) => goal.status === 'completed')

	async function handleDelete(goal) {
		const result = await deleteSavedGoal(goal.id)

		if (!result?.success) {
			console.error(result.error)
			return
		}
	}
	return (
		<section
			id="savings"
			className={styles.container}>
			<header className={styles.header}>
				<div>
					<h2>Savings goals</h2>

					<p>
						{activeGoals.length} active
						<span>·</span>
						{completedGoals.length} completed
					</p>
				</div>
				<button
					type="button"
					className={styles.newGoalButton}
					onClick={openGoalModal}>
					<Plus />
					<span>New goal</span>
				</button>
			</header>

			<Modal
				showModal={showGoalModal}
				closeModal={closeGoalModal}
				mounted={mounted}>
				<GoalForm />
			</Modal>

			<div className={styles.activeList}>
				{activeGoals.map((goal) => {
					const isContributing = contributionGoalId === goal.id
					const progress = getProgress(goal)
					const Icon = getGoalIcon(goal.category)

					return (
						<article
							key={goal.id}
							className={styles.goal}
							data-status={goal.status}>
							<div className={styles.goalIcon}>
								<Icon />
							</div>

							<div className={styles.goalMain}>
								<div className={styles.goalTop}>
									<div className={styles.goalTitle}>
										<h3>{goal.name}</h3>

										<span className={styles.percentage}>
											{Math.round(progress)}%
										</span>
									</div>

									<p className={styles.amount}>
										<strong>{formatCurrency(goal.saved_amount)}</strong>

										<span>/</span>

										<span>{formatCurrency(goal.target_amount)}</span>
									</p>
								</div>

								{goal.due_date && (
									<p className={styles.dueDate}>Due {goal.due_date}</p>
								)}

								<div className={styles.progressTrack}>
									<span
										className={styles.progressBar}
										style={{ width: `${progress}%` }}
									/>
								</div>

								<div className={styles.goalActions}>
									{isContributing ? (
										<ContributeForm
											goal={goal}
											closeForm={() => setContributionGoalId(null)}
										/>
									) : (
										<button
											type="button"
											className={styles.contributeButton}
											onClick={() => setContributionGoalId(goal.id)}>
											+ Contribute
										</button>
									)}

									<button
										type="button"
										className={styles.deleteButton}
										onClick={() => handleDelete(goal)}
										aria-label={`Delete ${goal.name}`}>
										<Trash2 />
									</button>
								</div>
							</div>
						</article>
					)
				})}
			</div>
			{completedGoals.length > 0 && (
				<div className={styles.completedSection}>
					<div className={styles.completedHeader}>
						<span>Completed</span>
						<span>·</span>
						<span>{completedGoals.length}</span>
					</div>

					<div className={styles.completedList}>
						{completedGoals.map((goal) => {
							const Icon = getGoalIcon(goal.category)

							return (
								<article
									key={goal.id}
									className={styles.completedGoal}>
									<Check className={styles.completedCheck} />

									<Icon className={styles.completedIcon} />

									<h3>{goal.name}</h3>

									<p>
										{formatCurrency(goal.saved_amount)}
										<span>/</span>
										{formatCurrency(goal.target_amount)}
									</p>

									<ArchiveButton goal={goal} />
								</article>
							)
						})}
					</div>
				</div>
			)}
		</section>
	)
}

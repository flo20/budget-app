'use client'

import { useModal, useMount } from '@/app/providers/GlobalProvider'
import Modal from '../Modal/Modal'
import GoalForm from './GoalForm'

export default function GoalCard() {
	const { openGoalModal, closeGoalModal, showGoalModal } = useModal()
	const { mounted } = useMount()

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
		</section>
	)
}

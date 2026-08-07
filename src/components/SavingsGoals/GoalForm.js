'use client'

import { useState } from 'react'

import {
	CUSTOM_CATEGORY_OPTION,
	SAVINGS_GOAL_CATEGORIES,
} from '@/lib/constants/saving-goals'
import { createSavingsGoal } from '@/app/actions/savings-goals'
import { useModal } from '@/app/providers/GlobalProvider'

export default function GoalForm() {
	const [selectedCategory, setSelectedCategory] = useState('general')

	const isCustomCategory = selectedCategory === CUSTOM_CATEGORY_OPTION

	const { closeGoalModal } = useModal()

	return (
		<form action={createSavingsGoal}>
			<label htmlFor="goal-name">Name</label>

			<input
				id="goal-name"
				name="name"
				type="text"
				maxLength={100}
				placeholder="e.g. New car down payment"
				autoComplete="off"
				required
			/>

			<div>
				<label htmlFor="target-amount">Target (USD)</label>

				<input
					id="target-amount"
					name="targetAmount"
					type="number"
					min="0.01"
					step="0.01"
					inputMode="decimal"
					placeholder="0.00"
					required
				/>
			</div>

			<div>
				<label htmlFor="saved-amount">Already saved</label>

				<input
					id="saved-amount"
					name="savedAmount"
					type="number"
					min="0"
					step="0.01"
					inputMode="decimal"
					defaultValue="0"
					placeholder="0.00"
				/>
			</div>
			<select
				name="category"
				value={selectedCategory}
				onChange={(event) => setSelectedCategory(event.target.value)}
				required>
				{SAVINGS_GOAL_CATEGORIES.map((category) => (
					<option
						key={category.value}
						value={category.value}>
						{category.label}
					</option>
				))}
			</select>
			{isCustomCategory && (
				<label>
					Custom category
					<input
						name="customCategory"
						type="text"
						maxLength={50}
						placeholder="e.g. Wedding"
						required
					/>
				</label>
			)}

			<div>
				<label htmlFor="goal-due-date">
					Due date <span>(optional)</span>
				</label>

				<input
					id="goal-due-date"
					name="dueDate"
					type="date"
				/>
			</div>
			<footer>
				<button
					type="button"
					onClick={closeGoalModal}>
					Cancel
				</button>
				<button type="submit"> Save Goal </button>
			</footer>
		</form>
	)
}

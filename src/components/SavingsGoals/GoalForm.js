'use client'

import { useState } from 'react'

import {
	CUSTOM_CATEGORY_OPTION,
	SAVINGS_GOAL_CATEGORIES,
} from '@/lib/constants/saving-goals'
import { createSavingsGoal } from '@/app/actions/savings-goals'
import { useModal } from '@/app/providers/GlobalProvider'
import { useFormAction } from '../hooks/useFormActions'

import {
	Form,
	FormHeader,
	FormField,
	FormInput,
	FormSelect,
	FormActions,
	FormButton,
    FormError
} from '@/components/Form'

export default function GoalForm() {
	const [selectedCategory, setSelectedCategory] = useState('general')

	const isCustomCategory = selectedCategory === CUSTOM_CATEGORY_OPTION

	const { closeGoalModal } = useModal()

    const { formAction, isPending, error } = useFormAction(
			createSavingsGoal,
			closeGoalModal,
		)

	return (
		<>
			<FormHeader
				title="New savings goal"
				description="Create a target and track your progress."
				onClose={closeGoalModal}
			/>

			<Form action={formAction}>
				<FormField
					label="Name"
					htmlFor="goal-name">
					<FormInput
						id="goal-name"
						name="name"
						type="text"
						maxLength={100}
						placeholder="e.g. New car down payment"
						autoComplete="off"
						required
					/>
				</FormField>

				<FormField
					label="Target (USD)"
					htmlFor="target-amount">
					<FormInput
						id="target-amount"
						name="targetAmount"
						type="number"
						min="0.01"
						step="0.01"
						inputMode="decimal"
						placeholder="0.00"
						required
					/>
				</FormField>

				<FormField
					label="Already saved"
					htmlFor="saved-amount">
					<FormInput
						id="saved-amount"
						name="savedAmount"
						type="number"
						min="0"
						step="0.01"
						inputMode="decimal"
						defaultValue="0"
						placeholder="0.00"
					/>
				</FormField>

				<FormField
					label="Category"
					htmlFor="goal-category">
					<FormSelect
						id="goal-category"
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
					</FormSelect>
				</FormField>

				{isCustomCategory && (
					<FormField
						label="Custom category"
						htmlFor="custom-category">
						<FormInput
							id="custom-category"
							name="customCategory"
							type="text"
							maxLength={50}
							placeholder="e.g. Wedding"
							required
						/>
					</FormField>
				)}

				<FormField
					label="Due date"
					optional
					htmlFor="goal-due-date">
					<FormInput
						id="goal-due-date"
						name="dueDate"
						type="date"
					/>
				</FormField>

				<FormError error={error} />

				<FormActions>
					<FormButton
						type="button"
						variant="secondary"
						onClick={closeGoalModal}
						disabled={isPending}>
						Cancel
					</FormButton>

					<FormButton
						type="submit"
						disabled={isPending}>
						{isPending ? 'Saving...' : 'Save Goal'}
					</FormButton>
				</FormActions>
			</Form>
		</>
	)
}

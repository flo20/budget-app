'use client'

import { useState, useCallback } from 'react'
import { useFormAction } from '../hooks/useFormActions'

import { setBudgetAllocation } from '@/app/actions/budget-allocations'

import CategorySelect from '../NewEntry/Categories/CategorySelect'
import CreateCategoryInline from '../NewEntry/Categories/CreateCategoryInline'

import { FormInput, FormError, FormButton } from '@/components/Form'

import { Plus } from 'lucide-react'

import styles from './BudgetAllocation.module.scss'

export default function AllocationForm({
	availableCategories = [],
	budgetMonth,
	selectedCategory,
	setSelectedCategory,
	setbudgetMonthlyLimit,
	onSuccess,
	budgetMonthlyLimit,
	limitInputRef,
}) {
	const [showCategoryForm, setShowCategoryForm] = useState(false)
	const [createdCategories, setCreatedCategories] = useState([])

	const handleAllocationSuccess = useCallback(() => {
		setCreatedCategories([])
		onSuccess?.()
	}, [onSuccess])

	const { formAction, isPending, error } = useFormAction(
		setBudgetAllocation,
		handleAllocationSuccess,
	)

	const categories = Array.from(
		new Map(
			[...availableCategories, ...createdCategories].map((category) => [
				category.id,
				category,
			]),
		).values(),
	)

	const handleCategoryCreated = useCallback(
		(newCategory) => {
			setCreatedCategories((previous) => [
				...previous.filter((category) => category.id !== newCategory.id),
				newCategory,
			])

			setSelectedCategory(newCategory.name)
			setShowCategoryForm(false)
		},
		[setSelectedCategory],
	)

	return (
		<>
			<form
				action={formAction}
				className={styles.allocationForm}>
				<input
					type="hidden"
					name="allocationBudgetMonth"
					value={budgetMonth}
				/>

				<div className={styles.allocationField}>
					<label
						htmlFor="allocation-category"
						className={styles.srOnly}>
						Category
					</label>

					<CategorySelect
						id="allocation-category"
						placeholder="Category"
						categories={categories}
						type="expense"
						value={selectedCategory}
						onChange={setSelectedCategory}
						onCreateCategory={() => setShowCategoryForm(true)}
						disabled={isPending || showCategoryForm}
					/>
				</div>
				<div className={styles.allocationField}>
					<label
						htmlFor="monthly-limit"
						className={styles.srOnly}>
						Monthly limit
					</label>
					<FormInput
						id="monthly-limit"
						ref={limitInputRef}
						name="monthlyLimit"
						type="number"
						value={budgetMonthlyLimit ?? ''}
						onChange={(event) => setbudgetMonthlyLimit(event.target.value)}
						min="0.01"
						step="0.01"
						placeholder="Monthly limit"
						required
					/>
				</div>

				<FormButton
					type="submit"
					className={styles.setButton}
					disabled={isPending || showCategoryForm || !selectedCategory}>
					<Plus />
					<span>{isPending ? 'Saving...' : 'Set'}</span>
				</FormButton>
				<FormError error={error} />
			</form>

			{showCategoryForm && (
				<div className={styles.createCategoryContainer}>
					<CreateCategoryInline
						type="expense"
						onCreated={handleCategoryCreated}
						onCancel={() => setShowCategoryForm(false)}
					/>
				</div>
			)}
		</>
	)
}

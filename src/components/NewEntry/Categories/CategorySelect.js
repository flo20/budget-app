'use client'

import { FormSelect } from '@/components/Form'

export default function CategorySelect({
	categories = [],
	type,
	value,
	onChange,
	onCreateCategory,
	id = 'category',
	placeholder = 'Select category',
	disabled = false,
}) {
	const availableCategories = categories.filter(
		(category) => category.type === type,
	)

	const standardCategories = availableCategories.filter(
		(category) => category.is_default,
	)

	const customCategories = availableCategories.filter(
		(category) => !category.is_default,
	)

	const handleChange = (event) => {
		const selected = event.target.value

		if (selected === '__create__') {
			onCreateCategory()
			return
		}

		onChange(selected)
	}

	return (
		<FormSelect
			id={id}
			name="category"
			value={value ?? ''}
			onChange={handleChange}
			disabled={disabled}
			required>
			<option
				value=""
				disabled>
				{placeholder}
			</option>

			{standardCategories.length > 0 && (
				<optgroup label="Standard categories">
					{standardCategories.map((category) => (
						<option
							key={category.id}
							value={category.name}>
							{category.name}
						</option>
					))}
				</optgroup>
			)}

			{customCategories.length > 0 && (
				<optgroup label="Your categories">
					{customCategories.map((category) => (
						<option
							key={category.id}
							value={category.name}>
							{category.name}
						</option>
					))}
				</optgroup>
			)}

			<option value="__create__">+ Create new category</option>
		</FormSelect>
	)
}

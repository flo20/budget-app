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

			{availableCategories.map((category) => (
				<option
					key={category.id}
					value={category.name}>
					{category.name}
				</option>
			))}

			<option value="__create__">+ Create new category</option>
		</FormSelect>
	)
}

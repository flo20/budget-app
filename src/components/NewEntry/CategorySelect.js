'use client'

import { FormSelect } from '@/components/Form'

export default function CategorySelect({
	categories,
	type,
	value,
	onChange,
	onCreateCategory,
}) {
	const availableCategories = categories.filter(
		(category) => category.type === type
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
			id="category"
			name="category"
			value={value}
			onChange={handleChange}
			required>

			<option value="" disabled>
				Select category
			</option>

			{availableCategories.map((category) => (
				<option
					key={category.id}
					value={category.name}>
					{category.name}
				</option>
			))}

			<option value="__create__">
				+ Create new category
			</option>
		</FormSelect>
	)
}
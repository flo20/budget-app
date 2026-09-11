'use client'

import { deleteLiability } from '@/app/actions/liabilities'

import { Trash2 } from 'lucide-react'

export default function DeleteButton({ liability }) {
	async function handleDelete(liability) {
		const result = await deleteLiability(liability)

		if (!result?.success) {
			console.error(result.error)
			return
		}
	}

	return (
		<button
			key={liability.id}
			onClick={() => handleDelete(liability.id)}>
			<Trash2 />
		</button>
	)
}

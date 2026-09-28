export function getPaymentStatus(dueDate) {
	const today = new Date()
	today.setHours(0, 0, 0, 0)

	const due = new Date(`${dueDate}T00:00:00`)

	const difference = Math.round(
		(due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
	)

	if (difference < 0) {
		return {
			type: 'overdue',
			label: `${Math.abs(difference)}D OVERDUE`,
		}
	}

	if (difference === 0) {
		return {
			type: 'today',
			label: 'DUE TODAY',
		}
	}

	return {
		type: 'upcoming',
		label: `IN ${difference}D`,
	}
}

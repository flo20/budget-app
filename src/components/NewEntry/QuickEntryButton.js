'use client'

import { useModal } from '@/app/providers/GlobalProvider'

export default function QuickEntryButton() {
	const { openEntryModal } = useModal()
	return <button onClick={openEntryModal}>QuickEntryButton</button>
}



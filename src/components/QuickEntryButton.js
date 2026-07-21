'use client'

import { useModal } from '@/app/providers/ThemeProvider'

export default function QuickEntryButton() {
	const { showEntryModal } = useModal()
	return <button onClick={showEntryModal}>QuickEntryButton</button>
}



'use client'

import { useActionState, useEffect } from 'react'

const initialState = {
	success: false,
	error: null,
}

export function useFormAction(action, onSuccess) {
	const [state, formAction, isPending] = useActionState(action, initialState)

	useEffect(() => {
		if (state?.success) {
			onSuccess?.(state)
		}
	}, [state, onSuccess])

	return {
		state,
		formAction,
		isPending,
		error: state?.error ?? null,
	}
}

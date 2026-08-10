export function toValidNumber(value) {
	const number = Number(value)

	return Number.isFinite(number) ? number : 0
}

export function getOptionalNumber(formData, fieldName) {
	const value = formData.get(fieldName)

	if (value === null || value === '') {
		return null
	}

	return Number(value)
}
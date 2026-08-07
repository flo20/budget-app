//make custom categories case-insensitive
export function normalizeCategory(value) {
	return value
		.trim()
		.replace(/\s+/g, ' ')
		.replace(/\b\p{L}/gu, (letter) => letter.toUpperCase())
}

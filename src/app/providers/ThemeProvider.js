'use client'

import {
	useEffect,
	useState,
	useCallback,
	useContext,
	createContext,
} from 'react'

// import "./ThemeProvider.module.scss"

const ThemeContext = createContext(undefined)

function getInitialTheme() {

    if (typeof window === 'undefined') {
			return 'light'
		}
	try {
		const theme = document.documentElement.getAttribute('data-theme')
		return theme === 'dark' ? 'dark' : 'light'
	} catch (_) {
		return 'light'
	}
}

export default function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(getInitialTheme)

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)

		try {
			localStorage.setItem('theme', theme)
		} catch (_) {}
	}, [theme])

    

	const callbackTheme = useCallback((next) => setTheme(next), [])

	const toggleTheme = useCallback(
		() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
		[],
	)

	return (
		<ThemeContext.Provider value={{ theme, callbackTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export function useTheme() {
	const themeContext = useContext(ThemeContext)
	if (!themeContext) throw new Error('useTheme must be inside <ThemeProvider>')
	return themeContext
}

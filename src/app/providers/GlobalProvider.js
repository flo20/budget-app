'use client'

import {
	useEffect,
	useState,
	useCallback,
	useContext,
	createContext,
} from 'react'

const GlobalContext = createContext(undefined)

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
	const [activeModal, setActiveModal] = useState(null)
	const [mounted, setMounted] = useState(false)

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

	//Theme Mount
	const mountDoc = () => setMounted(true)

	//Modal controls
	const openModal = useCallback((name) => setActiveModal(name), [])
	const closeModal = useCallback(() => setActiveModal(null), [])

	//New Entry Modal
	const showEntryModal = activeModal === 'entry'
	const openEntryModal = () => openModal('entry')
	const closeEntryModal = () => closeModal()

	//Pinned Payment Modal
	const showPinnedModal = activeModal === 'pinned'
	const openPinnedModal = () => openModal('pinned')
	const closePinnedModal = () => closeModal()

    //Asset Modal
    const showAssetModal = activeModal === 'asset'
    const openAssetModal = () => openModal('asset')
    const closeAssetModal = () => closeModal()

	return (
		<GlobalContext.Provider
			value={{
				theme,
				callbackTheme,
				toggleTheme,
				mounted,
				mountDoc,
				showEntryModal,
				openEntryModal,
				closeEntryModal,
				showPinnedModal,
				openPinnedModal,
				closePinnedModal,
				showAssetModal,
				openAssetModal,
				closeAssetModal,
			}}>
			{children}
		</GlobalContext.Provider>
	)
}

export function useTheme() {
	const themeContext = useContext(GlobalContext)
	if (!themeContext) throw new Error('useTheme must be inside <ThemeProvider>')
	return themeContext
}
export function useModal() {
	const modalContext = useContext(GlobalContext)
	if (!modalContext) throw new Error('useModal must be inside <ThemeProvider>')
	return modalContext
}
export function useMount() {
	const moountContext = useContext(GlobalContext)
	if (!moountContext) throw new Error('useMount must be inside <ThemeProvider>')
	return moountContext
}

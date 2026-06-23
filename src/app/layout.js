import './globals.css'
import ThemeProvider from './providers/ThemeProvider'

export const metadata = {
	title: 'Budget App',
	description: 'Household budgeting app',
}

const themeScript = `
( function(){
 try { const saved = localStorage.getItem("theme")
 if(saved === "light" || saved === "dark"){
    document.documentElement.setAttribute("data-theme", saved)
    return
 }  

 const prefersDark = window.matchMedia('(prefers-color-scheme:dark)').matches

 document.documentElement.setAttribute("data-theme", prefersDark ? "dark":"light")
 
 }catch(_){}
})()`

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	)
}

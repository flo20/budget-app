"use client"

import { useEffect } from "react"

import styles from "./Modal.module.scss"


export default function Modal({ showModal, closeModal, children }) {

    useEffect(() => {
		const OriginalOverflow = document.body.style.overflow
		document.documentElement.style.overflow = 'hidden'
		return () => {
		document.documentElement.style.overflow = OriginalOverflow
		}
	}, [])

    useEffect(() => {
        document.body.style.overflow ="hidden"
        function handleKeydown(e){
            if(e.key === "Escape"){
                closeModal()
            }
        }

        window.addEventListener("keydown", handleKeydown)
        return () => {
                document.body.style.overflow = " "
                window.removeEventListener('keydown', handleKeydown)

        };
    }, [closeModal]);



    if (!showModal) return null
	return (
		<div onClick={closeModal} className={styles.overlay}>
			<div onClick={(e)=> e.stopPropagation()} className={styles.dialog}>{children}</div>
		</div>
	) 

}


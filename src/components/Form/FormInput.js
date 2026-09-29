import { forwardRef } from 'react'

import styles from './Form.module.scss'

const FormInput = forwardRef(function FormInput(
	{ className = '', ...props },
	ref,
) {
	return (
		<input
			ref={ref}
			className={`${styles.control} ${className}`}
			{...props}
		/>
	)
})

export default FormInput

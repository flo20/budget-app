'use client'

import { useForm } from 'react-hook-form'

export default function NewEntryModal() {
	const {
		handleSubmit,
        register,
		//formState: { errors },
	} = useForm()

	const onSubmit = (data) => {
		console.log(data)
	}

	// console.log(watch("example"))
	return (
		<>
			<h3>New Ledger Entry</h3>
			<p>Record an income or expense</p>

			{/* Expense Form */}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>Expense</div>
				<label>
					Source
					<input {...register('source')} />
				</label>

				<label>
					Amount
					<input {...register('amount')} />
				</label>
				<label>
					Category
					<select {...register('category')}>
						{' '}
						<option value="">Select...</option>
						<option value="A">Category A</option>
						<option value="B">Category B</option>
					</select>
				</label>

				<div>
					<p>Expense kind</p>
					<div>Fixed</div>
					<div>Variable</div>
				</div>

				<div>
					<h5>Note</h5>
					<textarea placeholder="Write it out"></textarea>
				</div>
				<div>Cancel</div>
				<input type="submit" />
			</form>
		</>
	)
}

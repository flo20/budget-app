'use client'

import { useForm } from 'react-hook-form'

export default function NewEntryForm() {

		const category = [
			'Salary',
			'Housing',
			'Groceries',
			'Utilities',
			'Transport',
			'Recreation',
			'Healthcare',
			'Service',
			'Other',
		]
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
				<p>Record an income or expense. </p>
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
						<option value="">Select...</option>
						{category.map((cat) => (
							<option
								value={cat}
								key={cat}>
								{cat}
							</option>
						))}
					</select>
				</label>

				<div>
					<p>Expense kind</p>
					<label>
						<input
							type="radio"
							value="fixed"
							{...register('expenseKind')}
						/>
						Fixed
					</label>
					<label>
						<input
							type="radio"
							value="variable"
							{...register('expenseKind')}
						/>
						Variable
					</label>
				</div>

				<div>
					<h5>Note</h5>
					<textarea placeholder="Write it out"></textarea>
				</div>
				<div>Cancel</div>
				<button type="submit">Record Entry</button>
			</form>

			{/* Income Form */}
			{/* <form onSubmit={handleSubmit(onSubmit)}>
				<div>Income</div>
				<p>Record an income or expense</p>
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
						<option value="">Select...</option>
						{category.map((cat) => (
							<option
								value={cat}
								key={cat}>
								{cat}
							</option>
						))}
					</select>
				</label>

				<div>
					<h5>Note</h5>
					<textarea placeholder="Write it out"></textarea>
				</div>
				<div>Cancel</div>
				<button type="submit">Record Entry</button>
			</form> */}
		</>
	)
}

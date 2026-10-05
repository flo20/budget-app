export async function seedDemoData(supabase) {
	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser()

	if (userError || !user) {
		return {
			success: false,
			error: 'Unable to identify the demo user.',
		}
	}

	const userId = user.id
	const now = new Date()

	const currentYear = now.getFullYear()
	const currentMonth = now.getMonth()

	/*
	 * DATE HELPERS
	 */

	const toDateString = (date) => {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')

		return `${year}-${month}-${day}`
	}

	const dateForMonth = (monthOffset, day = 1) => {
		return toDateString(new Date(currentYear, currentMonth - monthOffset, day))
	}

	const budgetMonthFor = (monthOffset) => {
		return dateForMonth(monthOffset, 1)
	}

	/*
	 * TRANSACTIONS
	 *
	 * 0 = current month
	 * 1 = previous month
	 * 2 = two months ago
	 * 3 = three months ago
	 */

	const transactionData = [
		/*
		 * CURRENT MONTH
		 */
		{
			user_id: userId,
			source: 'Salary',
			amount: 8500,
			transaction_type: 'income',
			category: 'Salary',
			expense_type: null,
			transaction_date: dateForMonth(0, 1),
			notes: 'Monthly salary',
		},
		{
			user_id: userId,
			source: 'Freelance Project',
			amount: 1200,
			transaction_type: 'income',
			category: 'Freelance',
			expense_type: null,
			transaction_date: dateForMonth(0, 5),
			notes: 'Website project',
		},
		{
			user_id: userId,
			source: 'Rent',
			amount: 2400,
			transaction_type: 'expense',
			category: 'Housing',
			expense_type: 'fixed',
			transaction_date: dateForMonth(0, 2),
			notes: 'Monthly rent',
		},
		{
			user_id: userId,
			source: 'Supermarket',
			amount: 420,
			transaction_type: 'expense',
			category: 'Groceries',
			expense_type: 'variable',
			transaction_date: dateForMonth(0, 4),
			notes: 'Weekly groceries',
		},
		{
			user_id: userId,
			source: 'Electricity & Water',
			amount: 310,
			transaction_type: 'expense',
			category: 'Utilities',
			expense_type: 'fixed',
			transaction_date: dateForMonth(0, 6),
			notes: 'Monthly utilities',
		},
		{
			user_id: userId,
			source: 'Fuel',
			amount: 180,
			transaction_type: 'expense',
			category: 'Transport',
			expense_type: 'variable',
			transaction_date: dateForMonth(0, 8),
			notes: null,
		},
		{
			user_id: userId,
			source: 'Dinner',
			amount: 145,
			transaction_type: 'expense',
			category: 'Dining',
			expense_type: 'variable',
			transaction_date: dateForMonth(0, 10),
			notes: 'Dinner out',
		},
		{
			user_id: userId,
			source: 'Internet',
			amount: 350,
			transaction_type: 'expense',
			category: 'Utilities',
			expense_type: 'fixed',
			transaction_date: dateForMonth(0, 12),
			notes: 'Home internet',
		},

		/*
		 * 1 MONTH AGO
		 */
		{
			user_id: userId,
			source: 'Salary',
			amount: 8500,
			transaction_type: 'income',
			category: 'Salary',
			expense_type: null,
			transaction_date: dateForMonth(1, 1),
			notes: 'Monthly salary',
		},
		{
			user_id: userId,
			source: 'Freelance Project',
			amount: 900,
			transaction_type: 'income',
			category: 'Freelance',
			expense_type: null,
			transaction_date: dateForMonth(1, 8),
			notes: 'Freelance project',
		},
		{
			user_id: userId,
			source: 'Rent',
			amount: 2400,
			transaction_type: 'expense',
			category: 'Housing',
			expense_type: 'fixed',
			transaction_date: dateForMonth(1, 2),
			notes: 'Monthly rent',
		},
		{
			user_id: userId,
			source: 'Supermarket',
			amount: 760,
			transaction_type: 'expense',
			category: 'Groceries',
			expense_type: 'variable',
			transaction_date: dateForMonth(1, 6),
			notes: 'Monthly groceries',
		},
		{
			user_id: userId,
			source: 'Electricity & Water',
			amount: 295,
			transaction_type: 'expense',
			category: 'Utilities',
			expense_type: 'fixed',
			transaction_date: dateForMonth(1, 10),
			notes: 'Monthly utilities',
		},
		{
			user_id: userId,
			source: 'Fuel',
			amount: 390,
			transaction_type: 'expense',
			category: 'Transport',
			expense_type: 'variable',
			transaction_date: dateForMonth(1, 14),
			notes: null,
		},
		{
			user_id: userId,
			source: 'Dining',
			amount: 330,
			transaction_type: 'expense',
			category: 'Dining',
			expense_type: 'variable',
			transaction_date: dateForMonth(1, 19),
			notes: 'Restaurants and takeaway',
		},

		/*
		 * 2 MONTHS AGO
		 */
		{
			user_id: userId,
			source: 'Salary',
			amount: 8500,
			transaction_type: 'income',
			category: 'Salary',
			expense_type: null,
			transaction_date: dateForMonth(2, 1),
			notes: 'Monthly salary',
		},
		{
			user_id: userId,
			source: 'Freelance Project',
			amount: 650,
			transaction_type: 'income',
			category: 'Freelance',
			expense_type: null,
			transaction_date: dateForMonth(2, 17),
			notes: 'Freelance project',
		},
		{
			user_id: userId,
			source: 'Rent',
			amount: 2400,
			transaction_type: 'expense',
			category: 'Housing',
			expense_type: 'fixed',
			transaction_date: dateForMonth(2, 2),
			notes: 'Monthly rent',
		},
		{
			user_id: userId,
			source: 'Supermarket',
			amount: 690,
			transaction_type: 'expense',
			category: 'Groceries',
			expense_type: 'variable',
			transaction_date: dateForMonth(2, 7),
			notes: 'Monthly groceries',
		},
		{
			user_id: userId,
			source: 'Electricity & Water',
			amount: 340,
			transaction_type: 'expense',
			category: 'Utilities',
			expense_type: 'fixed',
			transaction_date: dateForMonth(2, 11),
			notes: 'Monthly utilities',
		},
		{
			user_id: userId,
			source: 'Fuel',
			amount: 425,
			transaction_type: 'expense',
			category: 'Transport',
			expense_type: 'variable',
			transaction_date: dateForMonth(2, 15),
			notes: null,
		},
		{
			user_id: userId,
			source: 'Dining',
			amount: 285,
			transaction_type: 'expense',
			category: 'Dining',
			expense_type: 'variable',
			transaction_date: dateForMonth(2, 21),
			notes: 'Restaurants and takeaway',
		},

		/*
		 * 3 MONTHS AGO
		 */
		{
			user_id: userId,
			source: 'Salary',
			amount: 8200,
			transaction_type: 'income',
			category: 'Salary',
			expense_type: null,
			transaction_date: dateForMonth(3, 1),
			notes: 'Monthly salary',
		},
		{
			user_id: userId,
			source: 'Freelance Project',
			amount: 500,
			transaction_type: 'income',
			category: 'Freelance',
			expense_type: null,
			transaction_date: dateForMonth(3, 12),
			notes: 'Freelance project',
		},
		{
			user_id: userId,
			source: 'Rent',
			amount: 2400,
			transaction_type: 'expense',
			category: 'Housing',
			expense_type: 'fixed',
			transaction_date: dateForMonth(3, 2),
			notes: 'Monthly rent',
		},
		{
			user_id: userId,
			source: 'Supermarket',
			amount: 810,
			transaction_type: 'expense',
			category: 'Groceries',
			expense_type: 'variable',
			transaction_date: dateForMonth(3, 6),
			notes: 'Monthly groceries',
		},
		{
			user_id: userId,
			source: 'Electricity & Water',
			amount: 375,
			transaction_type: 'expense',
			category: 'Utilities',
			expense_type: 'fixed',
			transaction_date: dateForMonth(3, 10),
			notes: 'Monthly utilities',
		},
		{
			user_id: userId,
			source: 'Fuel',
			amount: 460,
			transaction_type: 'expense',
			category: 'Transport',
			expense_type: 'variable',
			transaction_date: dateForMonth(3, 16),
			notes: null,
		},
		{
			user_id: userId,
			source: 'Dining',
			amount: 410,
			transaction_type: 'expense',
			category: 'Dining',
			expense_type: 'variable',
			transaction_date: dateForMonth(3, 22),
			notes: 'Restaurants and takeaway',
		},
	]

	/*
	 * CATEGORY BUDGETS
	 *
	 * Give all four months the same budget structure.
	 */

	const budgetTemplate = [
		{
			category: 'Housing',
			monthly_limit: 2500,
		},
		{
			category: 'Groceries',
			monthly_limit: 800,
		},
		{
			category: 'Utilities',
			monthly_limit: 800,
		},
		{
			category: 'Transport',
			monthly_limit: 500,
		},
		{
			category: 'Dining',
			monthly_limit: 400,
		},
	]

	const categoryBudgets = [0, 1, 2, 3].flatMap((monthOffset) =>
		budgetTemplate.map((budget) => ({
			user_id: userId,
			category: budget.category,
			monthly_limit: budget.monthly_limit,
			budget_month: budgetMonthFor(monthOffset),
		})),
	)

	/*
	 * ASSETS
	 */

	const assets = [
		{
			user_id: userId,
			name: 'Emergency Fund',
			asset_type: 'cash',
			current_value: 18500,
			notes: 'Emergency savings',
		},
		{
			user_id: userId,
			name: 'Investment Portfolio',
			asset_type: 'investment',
			current_value: 42300,
			notes: 'Long-term investments',
		},
		{
			user_id: userId,
			name: 'Savings Account',
			asset_type: 'cash',
			current_value: 8200,
			notes: null,
		},
	]

	/*
	 * LIABILITIES
	 */

	const liabilities = [
		{
			user_id: userId,
			name: 'Car Loan',
			liability_type: 'auto_loan',
			current_balance: 12400,
			original_amount: 22000,
			monthly_payment: 550,
			apr: 4.5,
		},
		{
			user_id: userId,
			name: 'Credit Card',
			liability_type: 'credit_card',
			current_balance: 1850,
			original_amount: null,
			monthly_payment: 250,
			apr: 19.9,
		},
	]

	/*
	 * SAVINGS GOALS
	 */

	const savingsGoals = [
		{
			user_id: userId,
			name: 'Family Holiday',
			target_amount: 6000,
			saved_amount: 4200,
			category: 'Travel',
			due_date: toDateString(new Date(currentYear + 1, 2, 31)),
			status: 'active',
		},
		{
			user_id: userId,
			name: 'New Car',
			target_amount: 15000,
			saved_amount: 8000,
			category: 'Purchase',
			due_date: toDateString(new Date(currentYear + 1, 8, 30)),
			status: 'active',
		},
		{
			user_id: userId,
			name: 'Emergency Fund',
			target_amount: 10000,
			saved_amount: 10000,
			category: 'Emergency',
			due_date: null,
			status: 'completed',
			completed_at: now.toISOString(),
		},
	]

	/*
	 * PINNED PAYMENTS
	 *
	 * Current month only.
	 */

	const pinnedPayments = [
		{
			user_id: userId,
			label: 'Car Payment',
			amount: 550,
			due_date: dateForMonth(0, 20),
			is_recurring_monthly: true,
			is_paid: false,
		},
		{
			user_id: userId,
			label: 'Internet',
			amount: 350,
			due_date: dateForMonth(0, 25),
			is_recurring_monthly: true,
			is_paid: false,
		},
		{
			user_id: userId,
			label: 'Insurance',
			amount: 420,
			due_date: dateForMonth(0, 28),
			is_recurring_monthly: true,
			is_paid: false,
		},
	]

	/*
	 * BUDGET NOTES
	 *
	 * Current month only.
	 */

	const budgetNotes = [
		{
			user_id: userId,
			content: 'Keep dining expenses below budget this month.',
			budget_month: budgetMonthFor(0),
			is_resolved: false,
		},
		{
			user_id: userId,
			content: 'Review subscriptions before next month.',
			budget_month: budgetMonthFor(0),
			is_resolved: false,
		},
	]

	/*
	 * INSERT DEMO DATA
	 */

	try {
		const [
			{ error: transactionsError },
			{ error: budgetsError },
			{ error: assetsError },
			{ error: liabilitiesError },
			{ error: goalsError },
			{ error: paymentsError },
			{ error: notesError },
		] = await Promise.all([
			supabase.from('transactions').insert(transactionData),

			supabase.from('category_budgets').insert(categoryBudgets),

			supabase.from('assets').insert(assets),

			supabase.from('liabilities').insert(liabilities),

			supabase.from('savings_goals').insert(savingsGoals),

			supabase.from('pinned_payments').insert(pinnedPayments),

			supabase.from('budget_notes').insert(budgetNotes),
		])

		const seedError =
			transactionsError ||
			budgetsError ||
			assetsError ||
			liabilitiesError ||
			goalsError ||
			paymentsError ||
			notesError

		if (seedError) {
			throw seedError
		}

		return {
			success: true,
			error: null,
		}
	} catch (error) {
		console.error('Failed to seed demo data:', error)

		return {
			success: false,
			error: 'Unable to prepare the demo account.',
		}
	}
}

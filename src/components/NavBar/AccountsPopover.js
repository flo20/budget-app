'use client'

import { PiggyBank, TrendingUp, CreditCard } from 'lucide-react'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

import AccountItem from './AccountItem'

export default function AccountsPopover({
	savings,
	assets,
	liabilities,
	netWorth,
}) {
	return (
		<Popover>
			<PopoverTrigger>ACCOUNTS</PopoverTrigger>
			<PopoverContent
				align="center"
				sideOffset={16}
				className="w-[760px] rounded-xl border border-[#29292e] bg-[#0c0c0f] p-0 shadow-2xl">
				<div className="p-8">
					<div className="grid grid-cols-3 divide-x divide-[#29292e]">
						<AccountItem
							href="#savings"
							icon={PiggyBank}
							label="Savings"
							// count={`${savings.count} goals`}
							// value={savings.total}
						/>

						<AccountItem
							href="#assets"
							icon={TrendingUp}
							label="Assets"
							// count={`${assets.count} holdings`}
							// value={assets.total}
						/>

						<AccountItem
							href="#liabilities"
							icon={CreditCard}
							label="Liabilities"
							// count={`${liabilities.count} accounts`}
							// value={liabilities.total}
						/>
					</div>

					<div className="mt-7 flex items-center justify-between border-t border-[#29292e] pt-7">
						<span className="font-mono text-sm tracking-[0.28em] text-zinc-400">
							NET WORTH
						</span>

						<span
							className={`font-mono text-3xl font-medium ${
								netWorth >= 0 ? 'text-emerald-400' : 'text-red-400'
							}`}>
							{/* {formatCompactCurrency(netWorth)} */}
						</span>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}

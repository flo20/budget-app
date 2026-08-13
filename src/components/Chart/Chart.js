import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import SpendingPace from './SpendingPace'
import CashFlow from './CashFlow'
import MonthlyTrend from './MonthlyTrend'
import Metric from './Metric'

export default function Chart({ budgetMonth }) {
	return (
		<>
			<section className="overflow-hidden rounded-2xl border border-[#29292e] bg-[#09090b]">
				<Tabs defaultValue="spending">
					<div className="flex flex-col border-b border-[#29292e] px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-10">
						<div className="font-mono text-sm tracking-[0.18em] text-zinc-400 md:text-base">
							OUTLOOK
							<span className="mx-3">·</span>
							<span className="text-zinc-100">AUGUST 2026</span>
						</div>

						<TabsList className="mt-5 h-auto justify-start gap-2 bg-transparent p-0 lg:mt-0">
							<TabsTrigger
								value="spending"
								className="
                rounded-none
                border-b-2
                border-transparent
                bg-transparent
                px-5
                py-3
                font-mono
                text-sm
                tracking-[0.15em]
                text-zinc-400
                shadow-none
                data-[state=active]:border-blue-500
                data-[state=active]:bg-transparent
                data-[state=active]:text-blue-400
                data-[state=active]:shadow-none
            ">
								SPENDING PACE
							</TabsTrigger>

							<TabsTrigger
								value="cashflow"
								className="
                rounded-none
                border-b-2
                border-transparent
                bg-transparent
                px-5
                py-3
                font-mono
                text-sm
                tracking-[0.15em]
                text-zinc-400
                shadow-none
                data-[state=active]:border-blue-500
                data-[state=active]:bg-transparent
                data-[state=active]:text-blue-400
                data-[state=active]:shadow-none
            ">
								CASH FLOW
							</TabsTrigger>

							<TabsTrigger
								value="trend"
								className="
                rounded-none
                border-b-2
                border-transparent
                bg-transparent
                px-5
                py-3
                font-mono
                text-sm
                tracking-[0.15em]
                text-zinc-400
                shadow-none
                data-[state=active]:border-blue-500
                data-[state=active]:bg-transparent
                data-[state=active]:text-blue-400
                data-[state=active]:shadow-none
            ">
								MONTHLY TREND
							</TabsTrigger>
						</TabsList>
					</div>

					<TabsContent
						value="spending"
						className="m-0">
						<div className="grid grid-cols-2 border-b border-[#29292e] lg:grid-cols-4">
							<Metric
								value="$195.19"
								label="SPENT"
							/>
							<Metric
								value="$3,300"
								label="BUDGET"
							/>
							<Metric
								value="$550.08"
								label="PROJECTED"
								positive
							/>
							<Metric
								value="$155.24"
								label="SAFE / DAY"
							/>
						</div>

						<SpendingPace budgetMonth={budgetMonth} />
					</TabsContent>

					<TabsContent
						value="cashflow"
						className="m-0">
						<div className="grid grid-cols-2 border-b border-[#29292e] lg:grid-cols-4">
							<Metric
								value="$195.19"
								label="SPENT"
							/>
							<Metric
								value="$3,300"
								label="BUDGET"
							/>
							<Metric
								value="$550.08"
								label="PROJECTED"
								positive
							/>
							<Metric
								value="$155.24"
								label="SAFE / DAY"
							/>
						</div>

						<CashFlow budgetMonth={budgetMonth} />
					</TabsContent>

					<TabsContent
						value="trend"
						className="m-0">
						<div className="grid grid-cols-2 border-b border-[#29292e] lg:grid-cols-4">
							<Metric
								value="$195.19"
								label="THIS MONTH"
							/>
							<Metric
								value="-92%"
								label="VS JUL"
								positive
							/>
							<Metric
								value="$907.13"
								label="3-MONTH AVG"
							/>
							<Metric
								value="+$4,004.81"
								label="NET CASH FLOW"
								positive
							/>
						</div>
						<MonthlyTrend budgetMonth={budgetMonth} />
					</TabsContent>
				</Tabs>
			</section>
		</>
	)
}

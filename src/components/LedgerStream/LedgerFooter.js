import { formatMonth } from "@/lib/utils/format"

export default function LedgerFooter({ showingCount, totalCount, budgetMonth }) {
	return (
		<div
			className="
                flex min-h-[110px]
                items-center justify-center
                border-t border-[#29292e]
                px-6
            ">
			<p
				className="
                    text-center font-mono
                    text-xs font-medium
                    tracking-[0.22em]
                    text-zinc-400
                    sm:text-sm
                ">
				SHOWING {showingCount} OF {totalCount} ENTRIES IN{' '}
				{formatMonth(budgetMonth).toUpperCase()}
			</p>
		</div>
	)
}
'use client'

import Link from 'next/link'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

export default function Profile({ user }) {
    const initial = user.email?.[0]?.toUpperCase()
	return (
		<Popover>
			<PopoverTrigger>{initial}</PopoverTrigger>
			<PopoverContent
				align="center"
				sideOffset={16}
				className="w-[200px] rounded-xl border border-[#29292e] p-0 shadow-2xl">
				<p>{user.email}</p>
                <p>HOUSEHOLD</p>
				<Link href="/">Log out</Link>
			</PopoverContent>
		</Popover>
	)
}

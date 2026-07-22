import { getPinnedPayments } from '@/lib/queries/pins'
import PinnedPaymentClient from './PinnedPaymentClient'

export default async function PinnedPayments() {
	const pinnedPayments = await getPinnedPayments()
    
	return <PinnedPaymentClient pinnedPayments={pinnedPayments} />
}

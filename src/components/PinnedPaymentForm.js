import { useModal } from "@/app/providers/GlobalProvider"

export default function PinnedPaymentForm () {
    const {closePinnedModal} = useModal()
  return (
		<form>
			<header>
				<h4>Pinned Payment</h4>
				<button onClick={closePinnedModal}>Close</button>
			</header>
		</form>
	)
}

import { getLiabilities } from '@/lib/queries/liabilities'
import { formatCurrency } from '@/lib/utils/format'
import LiabilitiesHeader from './LiabilitiesHeader'
import DeleteButton from './DeleteButton'

export default async function Liabilities() {
	const liabilities = await getLiabilities()

	return (
		<section id="liabilities">
			<LiabilitiesHeader />
			<ul>
				{liabilities.map((liability) => (
					<li
						key={liability.id}
						data-type={liability.liability_type}>
						<div>
							<div>
								<h3>{liability.name}</h3>
							</div>
							<strong>{formatCurrency(liability.current_balance)}</strong>
						</div>
						<DeleteButton liability={liability} />
					</li>
				))}
			</ul>
		</section>
	)
}

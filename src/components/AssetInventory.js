import styles from './AssetInventory.module.scss'

const assets = [
	{
		id: 1,
		name: 'Checking Account',
		type: 'cash',
		value: 6800,
	},
	{
		id: 2,
		name: 'Index Fund — VTI',
		type: 'investment',
		value: 24500,
	},
	{
		id: 3,
		name: 'Emergency Savings',
		type: 'cash',
		value: 12000,
	},
]

export default function AssetInventory() {
	return (
		<section
			id="assets"
			className={styles.container}>
			<header>
				<h2 id="asset-inventory-title">Asset Inventory</h2>
				<h2>{assets.length} items</h2>
			</header>
			<table>
				<thead className={styles.visuallyHidden}>
					<tr>
						<th scope="col">Asset</th>
						<th scope="col">Type</th>
						<th scope="col">Value</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>

				<tbody>
					{assets.map((asset) => (
						<tr key={asset.id}>
							<td>
								<p>{asset.name}</p>
								<span>{asset.type.toUpperCase()}</span>
							</td>

							<td>
								{asset.value.toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
							</td>

							<td>
								<button type="button">X</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	)
}

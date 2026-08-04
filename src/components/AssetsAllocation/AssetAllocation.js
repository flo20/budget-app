import AssetCard from './AssetHeader'
import AssetInventory from './AssetInventory'

import styles from "./AssetInventory.module.scss"

export default function AssetAllocation() {
	return (
		<section
				id="assets"
				className={styles.container}>
			<AssetCard />
			<AssetInventory />
		</section>
	)
}

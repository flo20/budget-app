
import AssetInventory from "./AssetInventory"
import AssetForm from './AssetForm'
import styles from './AssetInventory.module.scss'


export default function AssetCard() {
	return (
		<section
			id="assets"
			className={styles.container}>
			<header>
				<h2 id="asset-inventory-title">Asset Inventory</h2>
			</header>
		<AssetForm/>
        <AssetInventory/>
		</section>
	)
}

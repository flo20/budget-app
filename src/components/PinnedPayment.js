import styles from './PinnedPayment.module.scss'

export default function PinnedPayment() {
	return (
		<section id="pinned" className={styles.container}>
			<div>
				<h4>Pinned Title</h4>
				<p>$600</p>
			</div>

			<div>
				<p>Pinned date</p>
				<p>Due date</p>
				<p>Monthly/Yearly</p>
			</div>
			<div>
				<button>Paid</button>
				<button>Delete</button>
			</div>
		</section>
	)
}

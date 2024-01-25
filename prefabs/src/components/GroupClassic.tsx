import { For, Show } from 'solid-js'
import Card from './Card'
import CopyButton from './CopyButton'
import { PrefabCredit } from './PrefabCredit'
import { Prefab, getDiscriminator } from '../types/Prefab'
import styles from '../App.module.sass'

interface props {
	source: any
	group: any
}

export const GroupClassic = (props: props) => {
	const groupCreditList: any = []

	let groupedPrefabs = props.source
		.filter(
			(prefab: Prefab) =>
				props.group.children && props.group.children.includes(prefab.id)
		)
		.map((prefab: Prefab) => {
			if (prefab.credit.length) {
				groupCreditList.includes(prefab.credit.join())
					? (prefab.credit = [])
					: groupCreditList.push(prefab.credit.join())
			}

			return prefab
		})

	return (
		<Card
			title={props.group.name}
			image={props.group.image && `/${props.group.image}`}
		>
			<div class={styles.Buttons}>
				<For each={groupedPrefabs}>
					{(prefab: Prefab) => (
						<>
							<PrefabCredit prefab={prefab} />
							<CopyButton
								text={getDiscriminator(prefab)}
								fileName={prefab.file}
							/>
						</>
					)}
				</For>
			</div>
		</Card>
	)
}

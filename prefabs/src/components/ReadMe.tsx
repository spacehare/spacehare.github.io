import { createSignal } from 'solid-js'
import styles from '../App.module.sass'

export const readMeText = `HOW TO USE:
clicking a button will copy that brush or entity to your clipboard

You should have both prototype_1_3.wad and makkon_trim_guide.wad loaded to avoid UV corruption;
OR
ctrl+alt+v, apply a new texture, ctrl+x, ctrl+v

in trenchbroom, when you hit ctrl+z (undo) on a prefab you pasted in, it will not undo the paste — instead it reverts the translation from its original position to its new position. so you should delete brushes you pasted in instead of hitting undo

technical note:
brushes that need to be unique (such as linked groups; ex: "radial") will have their trenchbroom linked ID set to Date.now() (milliseconds since unix epoch)`

export const ReadMe = () => {
	const [toggled, setToggle] = createSignal(true)

	return (
		<div
			class={styles.generalInfo}
			style={{
				'overflow-y': 'scroll',
				// height: toggled() ? 'fit-content' : '60px',
				// 'overflow-y': toggled() ? 'scroll' : 'hidden',
			}}
			onClick={() => setToggle(!toggled())}
		>
			{readMeText}
		</div>
	)
}

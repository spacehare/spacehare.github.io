import type { Component } from 'solid-js';
import { createSignal, createEffect } from 'solid-js';
import { usePrefab } from './components/PrefabProvider';
import wad from '../src/assets/wad.json'
import styles from './App.module.sass';
import DropDown from './components/Dropdown';
import Prefabs from './components/Prefabs'

const App: Component = () => {
    const [trimStyle, setTrimStyle] = createSignal<string>(wad.default.trim.style)
    const [trimColor, setTrimColor] = createSignal<string>(wad.default.trim.color)
    const [prototypeColor, setPrototypeColor] = createSignal<string>(wad.default.prototype)
    const [searchText, setSearchText] = createSignal<string>('')
    const [desiredPrefab, setDesiredPrefab] = usePrefab()

    createEffect(() => {
        if (desiredPrefab()) {
            let output: string = desiredPrefab()!
                .replaceAll(wad.default.trim.style, trimStyle())
                .replaceAll(wad.default.trim.color, trimColor())
                .replaceAll(wad.default.prototype, prototypeColor())
                .replaceAll('@@@_REPLACE_ME_@@@', Date.now().toString())

            navigator.clipboard.writeText(output)
            setDesiredPrefab(null)
        }
    })

    const warning = `README
You should have both prototype_wad_1_3.wad and makkon_trim_guide.wad loaded to avoid UV corruption;
OR
ctrl+alt+v, apply a new texture, ctrl+x, ctrl+v

in trenchbroom, when you hit ctrl+z (undo) on a prefab you pasted in, it will not undo the paste — instead it reverts the translation from its original position to its new position. so you should delete brushes you pasted in instead of hitting undo

technical note:
brushes that need to be unique (such as linked groups) will have their trenchbroom linked ID set to Date.now(); milliseconds since unix epoch.`
    return (
        <div class={styles.App}>
            <div class={styles.sidebar}>
                <input placeholder="Search" class={styles.Search} onKeyUp={e => setSearchText(e.currentTarget.value)} autofocus />
                <div class={styles.dropdowns}>
                    <DropDown label='Trim Color' items={wad.trim.color} getter={trimColor} setter={setTrimColor} />
                    <DropDown label='Trim Style' items={wad.trim.style} getter={trimStyle} setter={setTrimStyle} />
                    <DropDown label='Prototype' items={wad.prototype} getter={prototypeColor} setter={setPrototypeColor} />
                </div>
                <div class={styles.generalInfo}>
                    {warning}
                </div>
                {/* onChange={e => setSearchText(e.currentTarget.value)} */}
                <div class={styles.bottomLinks}>
                    Resources:
                    <a href="https://web.archive.org/web/20230121043915/http://khreathor.xyz/site/prototype/">
                        Prototype textures by Khreathor
                    </a>
                    <a href="https://cdn.discordapp.com/attachments/1017318141480665088/1018287700962451476/makkon_trim_guide.wad">
                        Makkon trim textures by Kebby_
                    </a>
                    Technical:
                    <a href="https://developer.valvesoftware.com/wiki/MAP_file_format">
                        Valve MAP file format
                    </a>
                </div>
            </div>
            <Prefabs searchSignal={searchText} />
        </div>
    );
};

export default App
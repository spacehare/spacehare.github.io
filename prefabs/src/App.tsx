import type { Component } from 'solid-js';
import Row from './components/Row'
import tbObjects from '../src/assets/compiled.json'
import wad from '../src/assets/wad.json'
import logo from './logo.svg';
import styles from './App.module.scss';
import DropDown from './components/Dropdown';

var grids: boolean = true

const App: Component = () => {
  return (
    <div class={styles.App}>
      <div>
        <DropDown default='awa' id='selectColor' name='awa' items={wad.trim.color} />
        <DropDown default='awa' id='selectStyle' name='awa' items={wad.trim.style} />
        <DropDown default='awa' id='selectProto' name='awa' items={wad.prototype} />
      </div>
      <p>
        You should have both prototype_wad_1_3.wad and makkon_trim_guide.wad loaded to avoid UV corruption
        OR
        ctrl+alt+v, apply a new texture, ctrl+x, ctrl+v
      </p>
      <div id="lynx">
        <a href="https://web.archive.org/web/20230121043915/http://khreathor.xyz/site/prototype/">Prototype textures by
          Khreathor</a><br />
        <a href="https://cdn.discordapp.com/attachments/1017318141480665088/1018287700962451476/makkon_trim_guide.wad">Makkon trim textures by Kebby_</a><br />
        <a href="https: //developer.valvesoftware.com/wiki/MAP_file_format">
          Valve MAP file format</a>
      </div>
    </div>

  );
};

export default App;

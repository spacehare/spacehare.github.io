/* @refresh reload */
import { render } from 'solid-js/web';
import { PrefabProvider } from './components/PrefabProvider'

import './index.scss';
import App from './App';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

render(() =>
  <PrefabProvider>
    <App />
  </PrefabProvider>
  , root!);

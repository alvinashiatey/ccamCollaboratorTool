/* @refresh reload */
import { render } from 'solid-js/web';

import './styles/reset.css';
import './styles/index.css';
import App from './App';

render(() => <App />, document.getElementById('root') as HTMLElement);

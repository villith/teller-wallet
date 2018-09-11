import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import AppContainer from './components/AppContainer/AppContainer';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const app = (
  <MemoryRouter>
    <AppContainer />
  </MemoryRouter>
);

ReactDOM.render(app, document.getElementById('root') as HTMLElement);

registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import { v4 as uuidv4 } from 'uuid';

ReactDOM.render(
  <React.StrictMode>
    <App parentKey={uuidv4()} apiKey='1ccb732e-b55a-4404-ad3f-0f99c02fe44e'/>
  </React.StrictMode>,
  document.getElementById('root')
);

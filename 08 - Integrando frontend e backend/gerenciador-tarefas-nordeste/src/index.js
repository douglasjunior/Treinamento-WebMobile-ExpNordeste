import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import axios from 'axios';

import { getToken } from './utils/LoginManager';

axios.defaults.baseURL = 'http://gerenciadordetarefas.local/api';
axios.interceptors.request.use(request => {

    request.headers.Authorization = `Bearer ${getToken()}`;

    return request;
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

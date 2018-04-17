import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'antd/dist/antd.css';
import 'moment/locale/pt-br';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import { getToken } from './utils/LoginManager';

axios.defaults.baseURL = "http://gerenciadordetarefas.local/api";
axios.interceptors.request.use(request => {
    request.headers['Authorization'] = `Bearer ${getToken()}`;
    return request;
});

/**
 * Componente que define o roteador usado no react-router
 */
const Index = () => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();

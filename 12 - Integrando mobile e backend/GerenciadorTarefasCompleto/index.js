import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';

import axios from 'axios';

import { getToken } from './src/utils/LoginManager';

axios.defaults.baseURL = 'http://192.168.100.9/Treinamento-WebMobile-ExpNordeste/04 - Depuracao teste e deploy/gerenciador-de-tarefas-completo-back/public/api';
axios.interceptors.request.use(async (request) => {

    const token = await getToken();

    request.headers.Authorization = `Bearer ${token}`;

    return request;
})

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent('GerenciadorTarefasCompleto', () => App);

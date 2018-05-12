import React, { Component } from 'react';

import {
    BrowserRouter as Router,
} from 'react-router-dom';

import { LocaleProvider } from 'antd';
import pt_BR from 'antd/lib/locale-provider/pt_BR';
import 'moment/locale/pt-br';

import 'antd/dist/antd.css';
import MainLayout from './layouts/MainLayout';

class App extends Component {

    render() {
        return (
            <Router>
                <LocaleProvider locale={pt_BR}>
                    <MainLayout />
                </LocaleProvider>
            </Router>
        );
    }

}

export default App;

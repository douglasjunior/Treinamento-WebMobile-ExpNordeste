import React, { Component } from 'react';

import { Layout } from 'antd';
import { Route } from 'react-router-dom';

import './ContentRoutes.css';
import HomePage from '../pages/HomePage';
import TarefasPage from '../pages/TarefasPage';
import SobrePage from '../pages/SobrePage';

const { Content } = Layout;

export default class ContentRoutes extends Component {

    render() {
        return (
            <Content className="contentRoutes">
                <div className="contentRoutesContainer">

                    <Route path="/" exact component={HomePage} />

                    <Route path="/tarefas" component={TarefasPage} />

                    <Route path="/sobre" component={SobrePage} />

                </div>
            </Content>
        );
    }

}
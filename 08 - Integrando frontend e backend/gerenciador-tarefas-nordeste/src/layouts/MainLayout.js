import React, { Component } from 'react';

import { Layout, Icon } from 'antd';
import { Switch, Route } from 'react-router-dom';

import './MainLayout.css';
import PrivateRoute from '../components/PrivateRoute';
import LoginPage from '../pages/LoginPage';
import CadastroPage from '../pages/CadastroPage';
import { getUsuario } from '../utils/LoginManager';
import SideMenu from './SideMenu';
import ContentRoutes from './ContentRoutes';

const { Header } = Layout;

export default class MainLayout extends Component {

    state = {}

    renderConteudo = () => {
        const usuario = getUsuario();
        return (
            <Layout className="mainLayout">
                <SideMenu />

                <Layout>
                    <Header className="mainLayoutHeader">
                        <Icon type="user" />
                        <h2>Olá {usuario.nome}, bem vindo ao sistema!</h2>
                    </Header>

                    <ContentRoutes />
                </Layout>
            </Layout>
        )
    }

    render() {
        return (
            <Switch>

                <Route path="/login" component={LoginPage} />

                <Route path="/cadastro" component={CadastroPage} />

                <PrivateRoute render={this.renderConteudo} />

            </Switch>
        );
    }

}

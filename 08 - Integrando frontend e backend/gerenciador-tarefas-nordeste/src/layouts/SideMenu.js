import React, { Component } from 'react';

import { Layout, Menu, Icon } from 'antd';
import { withRouter, Link } from 'react-router-dom';

import './SideMenu.css';
import { removeToken } from '../utils/LoginManager';

const { Sider } = Layout;
const { Item, SubMenu } = Menu;

const MENU_ITEMS = [
    {
        url: '/',
        icon: 'home',
        title: 'Home',
    }, {
        url: '/tarefas',
        icon: 'file-text',
        title: 'Tarefas',
    }, {
        url: '/sobre',
        icon: 'info-circle-o',
        title: 'Sobre',
    },
];

class SideMenu extends Component {

    state = {}

    sair = () => {
        removeToken();
        this.props.history.push('/login');
    }

    renderItems = () => {
        const items = MENU_ITEMS.map((item) => {
            return (
                <Item key={item.url}>
                    <Link to={item.url}>
                        <Icon type={item.icon} />
                        <span className="nav-text">
                            {item.title}
                        </span>
                    </Link>
                </Item>
            );
        });

        // const items = [];

        // for (let i = 0; i < MENU_ITEMS.length; i++) {
        //     const item = MENU_ITEMS[i];

        //     items.push((
        //         <Item>
        //             <Link to={item.url}>
        //                 <Icon type={item.icon} />
        //                 <span className="nav-text">
        //                     {item.title}
        //                 </span>
        //             </Link>
        //         </Item>
        //     ))
        // }

        return items;
    }

    render() {
        return (
            <Sider
                breakpoint="md"
                collapsedWidth="0"
            >

                <div className="side-menu-logo">
                    <h1>Expresso Nordeste</h1>
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[this.props.location.pathname]}
                >

                    {this.renderItems()}

                    <Item>
                        <a href="#" onClick={this.sair}>
                            <Icon type="logout" />
                            <span className="nav-text">
                                Sair
                            </span>
                        </a>
                    </Item>

                </Menu>

            </Sider>
        );
    }
}

export default withRouter(SideMenu);
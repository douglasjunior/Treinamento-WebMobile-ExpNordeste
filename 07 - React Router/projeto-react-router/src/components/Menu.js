import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';

import UsarioLogado from '../utils/UsuarioLogado';
import CustomLink from './CustomLink';

class Menu extends Component {

    onDeslogarClick = () => {
        UsarioLogado.deslogar();
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="App">
                <ul style={{ listStyle: 'none' }}>
                    <li>
                        <CustomLink to="/" exact label="Home" />
                    </li>
                    <li>
                        <CustomLink to="/tarefas" label="Tarefas" />
                    </li>
                    <li>
                        <CustomLink to="/sobre" label="Sobre" />
                    </li>

                    {UsarioLogado.estaLogado() ? (
                        <li>
                            <a href="#" onClick={this.onDeslogarClick}>
                                Sair
                            </a>
                        </li>
                    ) : null}

                </ul>
            </div>
        );
    }
}

export default withRouter(Menu);

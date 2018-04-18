import React, { Component } from 'react';

import { Prompt } from 'react-router-dom';

import UsuarioLogado from '../utils/UsuarioLogado';

class LoginPage extends Component {

    state = {
        bloquerUsuario: false,
    }

    onEntrarClick = () => {
        UsuarioLogado.logar();
        this.props.history.push('/');
    }

    onInputChange = () => {
        this.setState({
            bloquerUsuario: true
        })
    }

    render() {
        return (
            <div className="paginaAbsoluta">
                <Prompt
                    when={this.state.bloquerUsuario}
                    message="Deseja realmente navegar para outra página?"
                />

                <h1>Faça Login!</h1>

                <br />

                <input onChange={this.onInputChange} />

                <br /><br />

                <button onClick={this.onEntrarClick}>
                    Entrar
                </button>
            </div>
        )
    }

}

export default LoginPage;

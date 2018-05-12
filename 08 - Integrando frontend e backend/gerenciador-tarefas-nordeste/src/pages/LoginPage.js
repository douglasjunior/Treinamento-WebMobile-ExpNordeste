import React, { Component } from 'react';

import { Form, Button, Icon } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import './LoginPage.css';
import { validateEmail, validateSenha, checkFormIsValid } from '../utils/Validator';
import InputForm from '../components/InputForm';
import { saveToken, isLoggedIn } from '../utils/LoginManager';

const ItemForm = Form.Item;

export default class LoginPage extends Component {

    state = {
        email: '',
        senha: '',
        aguarde: false,
    }

    onChange = (event) => {
        const { id, value } = event.target;
        this.setState({
            [id]: value,
        })
    }

    onLogin = event => {
        event.preventDefault();

        const formValid = checkFormIsValid(this.refs);

        if (formValid) {
            const { email, senha } = this.state;

            const body = {
                email,
                senha
            };

            this.setState({
                aguarde: true
            })

            const request = axios.post('/usuarios/login', body);
            request.then((response) => {
                saveToken(response.data.token);
                this.props.history.push('/');
            });
            request.catch((error) => {
                console.error(error);
                this.setState({
                    aguarde: false
                })
                if (error.response) {
                    if (error.response.status === 401) {
                        alert('Usuário ou senha inválidos.');
                    } else {
                        alert('Liga pro suporte.');
                    }
                } else {
                    alert('Não foi possível se comunicar com o servidor, verifique sua conexão com a Internet.');
                }
            });
        }

    }

    render() {
        if (isLoggedIn()) {
            return (
                <Redirect to="/" />
            );
        }

        const { email, senha, aguarde } = this.state;

        return (
            <Form className="login-form" onSubmit={this.onLogin}>
                <ItemForm>
                    <h2>Entre com os dados de Login</h2>
                </ItemForm>

                <InputForm
                    disabled={aguarde}
                    id="email"
                    ref="email"
                    value={email}
                    prefix={<Icon type="mail" />}
                    size="large"
                    type="email"
                    placeholder="E-mail"
                    required
                    validator={validateEmail}
                    onChange={this.onChange}
                    errorMessage="Informe um e-mail válido."
                />

                <InputForm
                    disabled={aguarde}
                    id="senha"
                    ref="senha"
                    value={senha}
                    prefix={<Icon type="lock" />}
                    size="large"
                    type="password"
                    placeholder="Senha"
                    required
                    validator={validateSenha}
                    onChange={this.onChange}
                    errorMessage="A senha deve ter entre 6 e 8 caracteres."
                />

                <ItemForm>
                    <Button
                        size="large"
                        htmlType="submit"
                        type="primary"
                        className="login-button"
                        loading={aguarde}
                    >
                        Entrar
                    </Button>

                    <footer>
                        Ou <Link to="/cadastro" >cadastre-se!</Link>
                    </footer>
                </ItemForm>
            </Form>
        );
    }
}
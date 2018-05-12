import React, { Component } from 'react';

import { Form, Button, Icon, Col, Row } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import './CadastroPage.css';
import { validateEmail, validateSenha, validateCPF, checkFormIsValid } from '../utils/Validator';
import InputForm from '../components/InputForm';
import { maskCPF, maskDate } from '../utils/Masker';

const ItemForm = Form.Item;

export default class CadastroPage extends Component {

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

    onCadastro = event => {
        event.preventDefault();

        const formValid = checkFormIsValid(this.refs);

        if (formValid) {
            const { nome, email, senha, cpf, nascimento } = this.state;

            const body = {
                nome,
                email,
                senha,
                cpf: cpf.replace(/[^\d]/g, ''),
                nascimento: moment(nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            };

            this.setState({
                aguarde: true
            })

            const request = axios.post('/usuarios', body);
            request.then((response) => {
                alert('Usuário cadastrado com sucesso!');
                this.props.history.push('/login');
            });
            request.catch((error) => {
                console.error(error);
                this.setState({
                    aguarde: false
                })
                if (error.response) {
                    const { status, data } = error.response;
                    if (status === 412 && data.email && data.email.indexOf('validation.unique') !== -1) {
                        alert('E-mail já cadastrado na base de dados.');
                    } else {
                        alert('Liga pro suporte.');
                    }
                } else {
                    alert('Não foi possível se comunicar com o servidor, verifique sua conexão com a Internet.');
                }
            });
        }

    }

    onCancelar = () => {
        this.props.history.push('/login');
    }

    render() {
        const {
            nome, cpf, email, senha, aguarde,
            nascimento
        } = this.state;

        return (
            <Form className="cadastro-form" onSubmit={this.onCadastro}>
                <ItemForm>
                    <h2>Cadastro de usuários</h2>
                </ItemForm>

                <InputForm
                    disabled={aguarde}
                    id="nome"
                    ref="nome"
                    value={nome}
                    label="Nome"
                    required
                    validator={value => Boolean(value)}
                    onChange={this.onChange}
                    errorMessage="Informe o nome do usuário."
                />

                <Row>
                    <Col xs={24} sm={12}>
                        <InputForm
                            disabled={aguarde}
                            id="cpf"
                            ref="cpf"
                            value={cpf}
                            label="CPF"
                            placeholder="000.000.000-00"
                            required
                            validator={validateCPF}
                            masker={maskCPF}
                            onChange={this.onChange}
                            errorMessage="Informe um CPF válido."
                        />
                    </Col>
                    <Col xs={0} sm={1} />
                    <Col xs={24} sm={11} >
                        <InputForm
                            disabled={aguarde}
                            id="nascimento"
                            ref="nascimento"
                            value={nascimento}
                            label="Data de nascimento"
                            type="date"
                            placeholder="DD/MM/AAAAA"
                            required
                            masker={maskDate}
                            validator={date => moment(date, 'DD/MM/YYYY', true).isValid()}
                            dateFormat="DD/MM/YYYY"
                            onChange={this.onChange}
                            errorMessage="Informe a data no formato DD/MM/AAAAA."
                        />
                    </Col>
                </Row>

                <InputForm
                    disabled={aguarde}
                    id="email"
                    ref="email"
                    value={email}
                    type="email"
                    label="E-mail"
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
                    type="password"
                    label="Senha"
                    required
                    validator={validateSenha}
                    onChange={this.onChange}
                    errorMessage="A senha deve ter entre 6 e 8 caracteres."
                />

                <ItemForm>
                    <Button
                        size="large"
                        disabled={aguarde}
                        onClick={this.onCancelar}
                    >
                        Cancelar
                    </Button>

                    <Button
                        size="large"
                        htmlType="submit"
                        type="primary"
                        loading={aguarde}
                        className="cadastro-button"
                    >
                        Salvar
                    </Button>

                </ItemForm>
            </Form>
        );
    }
}
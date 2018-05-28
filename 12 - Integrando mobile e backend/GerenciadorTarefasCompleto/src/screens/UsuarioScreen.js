import React, { Component } from 'react';
import {
    View, Platform, ScrollView,
} from 'react-native';

import { Text } from 'react-native-elements';
import moment from 'moment';
import axios from 'axios';

import Colors from '../values/Colors';
import StatusBar from '../components/StatusBar';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import {
    validateEmail, validateSenha,
    checkFormIsValid, validateCPF,
} from '../utils/Validator';
import { maskCPF } from '../utils/Maskers';

const DATE_FORMAT = 'DD/MM/YYYY';

export default class UsuarioScreen extends Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        nascimento: '',
        cpf: ''
    };

    onFormSubmit = (event) => {
        if (checkFormIsValid(this.refs)) {
            this.postUsuario();
        }
    }

    postUsuario = () => {
        const { navigation } = this.props;
        const { nome, email, senha, nascimento, cpf } = this.state;

        this.setState({ loading: true });

        axios.post('/usuarios', {
            nome, email,
            senha,
            nascimento: moment(nascimento, DATE_FORMAT).format("YYYY-MM-DD"),
            cpf: cpf.replace(/[^\d]/g, '')
        }).then(response => {

            alert('Usuário cadastrado com sucesso!');
            navigation.goBack(null);
            navigation.navigate('LoginScreen');

        }).catch(error => {
            console.warn(error);
            this.setState({ loading: false });
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
        })
    }

    onInputChange = (id, value) => {
        const state = {};
        state[id] = value;
        this.setState(state);
    }

    validateNascimento = (value) => {
        return moment(value, DATE_FORMAT, true).isValid();
    }

    render() {
        const { nome, email, senha, nascimento, cpf, loading } = this.state;
        return (
            <View style={{ flex: 1, }}>
                <StatusBar />

                <ScrollView style={{ flex: 1, }} keyboardShouldPersistTaps="always">
                    <View style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 16 }}>

                        <TextInput id="nome" ref="nome" label="Nome" value={nome} onChange={this.onInputChange} required={true}
                            validator={value => !!value && value.length >= 3} errorMessage="O nome é obrigatório." />

                        <TextInput id="cpf" ref="cpf" label="CPF" value={cpf} onChange={this.onInputChange} required={true}
                            validator={validateCPF} masker={maskCPF} errorMessage="Informe um CPF válido." keyboardType="numeric" />

                        <TextInput id="email" ref="email" label="E-mail" value={email} onChange={this.onInputChange} required={true}
                            validator={validateEmail} errorMessage="Informe um e-mail válido." keyboardType="email-address"
                            autoCapitalize="none" />

                        <TextInput id="senha" ref="senha" label="Senha" value={senha} onChange={this.onInputChange} required={true}
                            secureTextEntry={true}
                            validator={validateSenha} errorMessage="A senha deve conter no mínimo 6 e no máximo 8 caracteres." />

                        <TextInput id="nascimento" ref="nascimento" label="Data de nascimento" type="date" required={true}
                            dateFormat={DATE_FORMAT} value={nascimento} onChange={this.onInputChange}
                            validator={this.validateNascimento} errorMessage="Informe a data de nascimento no formato dd/mm/aaaa." />

                        <Button title="CRIAR CONTA" loading={loading} onPress={this.onFormSubmit} color={Colors.textOnPrimary} />

                    </View>
                </ScrollView>
            </View>
        )
    }
}
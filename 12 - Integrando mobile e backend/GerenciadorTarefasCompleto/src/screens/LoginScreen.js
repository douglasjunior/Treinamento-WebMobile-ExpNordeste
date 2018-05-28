import React, { Component } from 'react';
import {
    View, Platform, ScrollView
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import { Text } from 'react-native-elements';
import moment from 'moment';
import axios from 'axios';

import Colors from '../values/Colors';
import StatusBar from '../components/StatusBar';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { validateEmail, validateSenha, checkFormIsValid } from '../utils/Validator';
import { saveToken } from '../utils/LoginManager';

export default class LoginScreen extends Component {

    state = { email: 'douglas@mail.com', senha: 'senha123' };

    onFormSubmit = (event) => {
        if (checkFormIsValid(this.refs)) {
            this.postLogin();
        }
    }

    postLogin = () => {
        this.setState({ loading: true });
        const { email, senha } = this.state;

        axios.post("/usuarios/login", {
            email, senha
        }).then(async response => {

            await saveToken(response.data.token);
            this.goToHome()

        }).catch(error => {
            console.warn(error);
            this.setState({ loading: false });
            if (error.response) {
                if (error.response.status === 401) {
                    alert('Usuário ou senha inválidos.');
                } else {
                    alert('Liga pro suporte.');
                }
            } else {
                alert('Não foi possível se comunicar com o servidor, verifique sua conexão com a Internet.');
            }
        })
    }

    goToHome = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: "HomeScreen" })
            ]
        })

        this.props.navigation.dispatch(resetAction);
    }

    onInputChange = (id, value) => {
        const state = {};
        state[id] = value;
        this.setState(state);
    }

    render() {
        const { email, senha, loading } = this.state;
        return (
            <View style={{ flex: 1, }}>
                <StatusBar />

                <ScrollView style={{ flex: 1, }}>
                    <View style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 16 }}>

                        <TextInput id="email" ref="email" label="E-mail" value={email} onChange={this.onInputChange} required={true}
                            validator={validateEmail} errorMessage="Informe um e-mail válido." keyboardType="email-address"
                            autoCapitalize="none" />

                        <TextInput id="senha" ref="senha" label="Senha" value={senha} onChange={this.onInputChange} required={true}
                            secureTextEntry={true}
                            validator={validateSenha} errorMessage="A senha deve conter no mínimo 6 e no máximo 8 caracteres." />

                        <Button title="ENTRAR" loading={loading} onPress={this.onFormSubmit} color={Colors.textOnPrimary} />

                    </View>
                </ScrollView>
            </View>
        )
    }
}
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Button, Header } from 'react-native-elements';

export default class HomeScreen extends Component {

    abrirAjuda = () => {
        this.props.navigation.navigate('Ajuda');
    }

    abrirRelatorios = () => {
        this.props.navigation.navigate('Relatorios');
    }

    render() {
        return (
            <View>
                <Text>Home</Text>
                <Button
                    title="Abrir Ajuda"
                    onPress={this.abrirAjuda}
                />
                <Button
                    title="Abrir Relatórios"
                    onPress={this.abrirRelatorios}
                />
            </View>
        );
    }

}

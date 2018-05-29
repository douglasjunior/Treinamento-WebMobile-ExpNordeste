import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Button } from 'react-native-elements';

export default class ClientesTab extends Component {

    voltar = () => {
        this.props.navigation.goBack(null);
    }

    render() {
        return (
            <View>
                <Text>Relatório de Clientes</Text>
                <Button
                    title="Voltar"
                    onPress={this.voltar}
                />
            </View>
        );
    }

}

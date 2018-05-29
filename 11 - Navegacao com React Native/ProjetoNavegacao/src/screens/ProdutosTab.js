import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Button } from 'react-native-elements';

export default class ProdutosTab extends Component {

    voltar = () => {
        this.props.navigation.goBack(null);
    }

    render() {
        return (
            <View>
                <Text>Relatório de Produtos</Text>
                <Button
                    title="Voltar"
                    onPress={this.voltar}
                />
            </View>
        );
    }

}

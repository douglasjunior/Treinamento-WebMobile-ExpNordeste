import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Button } from 'react-native-elements';

export default class AjudaScreen extends Component {

    voltar = () => {
        this.props.navigation.goBack(null);
    }

    render() {
        return (
            <View>
                <Text>Ajuda</Text>
                <Button
                    title="Voltar"
                    onPress={this.voltar}
                />
            </View>
        );
    }

}

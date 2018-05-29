import React, { Component } from 'react';
import {
    View, Text,
    Image, StyleSheet,
    Dimensions,
} from 'react-native';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Touchable from './Touchable';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 4,
        elevation: 2,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    image: {
        height: 200,
    },
    content: {
        padding: 16,
    },
    iconContainer: {
        alignItems: 'center'
    },
    titulo: {
        fontSize: 22,
        color: 'rgba(0,0,0,0.87)',
    },
    subTitulo: {
        fontSize: 16,
        color: 'rgba(0,0,0,0.60)',
    },
    conteudo: {
        fontSize: 18,
        marginTop: 16,
        color: 'rgba(0,0,0,0.60)',
    }
});

export default class CardView extends Component {

    render() {
        const { imagem, titulo, subTitulo,
            conteudo, onPress,
        } = this.props;
        const { width } = Dimensions.get('window');
        return (
            <View style={styles.container}>
                <Touchable onPress={onPress}>
                    <View>
                        <Image
                            source={imagem}
                            style={[styles.image, { width: width - 32 }]}
                        />

                        <View style={styles.content}>
                            <Text style={styles.titulo}>{titulo}</Text>

                            <Text style={styles.subTitulo}>{subTitulo}</Text>

                            <Text style={styles.conteudo}>{conteudo}</Text>

                            <Button
                                title="Clique Aqui"
                                color="#000"
                                backgroundColor="#ffbf00"
                                buttonStyle={{ elevation: 2 }}
                                containerViewStyle={{
                                    marginTop: 8,
                                    marginLeft: 0,
                                    marginRight: 0,
                                }}
                                iconComponent={Icon}
                                icon={{
                                    color: '#000',
                                    name: 'add-a-photo',
                                    size: 20
                                }}
                            />

                            <View style={styles.iconContainer}>
                                <Icon name="person-add" size={100} color="purple" />
                            </View>

                        </View>
                    </View>
                </Touchable>
            </View>
        );
    }

}

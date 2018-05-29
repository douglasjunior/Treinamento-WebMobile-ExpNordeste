import React, { Component } from 'react';
import {
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform
} from 'react-native';

const { OS, Version } = Platform;

export default class Touchable extends Component {

    render() {
        if (OS === 'android' && Version >= 21) {
            return (
                <TouchableNativeFeedback {...this.props} />
            )
        }
        return (
            <TouchableOpacity {...this.props} />
        );
    }

}
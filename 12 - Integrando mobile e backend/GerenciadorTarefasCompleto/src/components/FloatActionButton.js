import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
    fab: {
        height: 48, width: 48,
        position: 'absolute',
        bottom: 25,
        right: 24,
        borderRadius: 24,
        elevation: 4,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

const FloatActionButton = (props) => {
    const {
        iconFamily, iconName, iconColor, backgroundColor,
        onPress,
    } = props;
    return (
        <View style={[styles.fab, { backgroundColor }]}>
            <TouchableOpacity onPress={onPress} style={styles.content}>
                <View style={styles.content}                >
                    <Icon family={iconFamily} name={iconName} color={iconColor} size={24} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default FloatActionButton;

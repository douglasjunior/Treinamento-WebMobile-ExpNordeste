import React, { Component } from 'react';
import { View, Text, Platform, Image, TouchableOpacity } from 'react-native';

import { StackNavigator, DrawerNavigator, withNavigation } from 'react-navigation';

import SplashScreen from './SplashScreen';
import BemVindoScreen from './BemVindoScreen';
import LoginScreen from './LoginScreen';
import UsuarioScreen from './UsuarioScreen';
import HomeScreen from './HomeScreen';
import TarefaScreen from './TarefaScreen';
import TarefasScreen from './TarefasScreen';

import Icon from '../components/Icon';
import Drawer from '../components/Drawer';
import Colors from '../values/Colors';

import HeaderBackButton from 'react-navigation/src/views/Header/HeaderBackButton'

const defaultNavigationOptions = Platform.select({
    ios: {
        headerTintColor: Colors.primary,
        headerTitleStyle: {
            color: Colors.textPrimaryDark,
        }
    }, android: {
        headerTintColor: Colors.textOnPrimary,
        headerStyle: {
            backgroundColor: Colors.primary
        },
    }
});
defaultNavigationOptions.headerBackTitle = "Voltar";
defaultNavigationOptions.drawerLockMode = 'locked-closed';

const MenuButton = withNavigation((props) => {
    const { navigation } = props;
    return (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
            <Icon family="MaterialIcons"
                name="menu"
                color={Colors.textOnPrimary}
                style={{ padding: 16 }} />
        </TouchableOpacity>
    )
})

const HomeStackNavigator = StackNavigator({
    SplashScreen: {
        screen: SplashScreen,
        navigationOptions: {
            header: () => null,
            ...defaultNavigationOptions
        }
    },
    BemVindoScreen: {
        screen: BemVindoScreen,
        navigationOptions: {
            header: () => null,
            ...defaultNavigationOptions
        }
    },
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            title: "Entrar",
            ...defaultNavigationOptions
        }
    },
    UsuarioScreen: {
        screen: UsuarioScreen,
        navigationOptions: {
            title: "Criar conta",
            ...defaultNavigationOptions
        }
    },
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            title: "Home",
            headerLeft: <MenuButton />,
            ...defaultNavigationOptions,
            drawerLockMode: 'unlocked',
        }
    },
    TarefasScreen: {
        screen: TarefasScreen,
        navigationOptions: {
            title: "Suas tarefas",
            ...defaultNavigationOptions,
        }
    },
    TarefaScreen: {
        screen: TarefaScreen,
        navigationOptions: {
            title: "Tarefa",
            ...defaultNavigationOptions
        }
    },
}, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: Colors.primary,
            },
            headerTitleStyle: {
                color: Colors.textOnPrimary
            },
            headerTintColor: Colors.textOnPrimary,
            headerBackTitleStyle: {
                color: Colors.textOnPrimary,
            },
            // headerLeft: (props) => {
            //     return <HeaderBackButton {...props} tintColor={Colors.textOnPrimary} />
            // }
        },
    });



const HomeDrawerNavigator = DrawerNavigator(
    {
        HomeStack: {
            screen: HomeStackNavigator
        }
    },
    {
        contentComponent: Drawer,
    }
)

export default class AppNavigator extends Component {
    render() {
        return (
            <HomeDrawerNavigator />
        )
    }
}
import React from 'react';
import { View } from 'react-native';

import {
    StackNavigator, TabNavigator, TabBarBottom,
    DrawerNavigator, withNavigation
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './HomeScreen';
import AjudaScreen from './AjudaScreen';
import ClientesTab from './ClientesTab';
import ProdutosTab from './ProdutosTab';

import Touchable from '../components/Touchable';

const MenuButton = withNavigation(props => {
    const { navigation } = props;
    return (
        <View>
            <Touchable onPress={() => navigation.navigate('DrawerOpen')}>
                <View style={{ padding: 8 }}>
                    <Icon name="menu" size={32} color="#000" />
                </View>
            </Touchable>
        </View>
    );
});

const RelatoriosTabs = TabNavigator({
    ClientesTab: {
        screen: ClientesTab,
        navigationOptions: {
            title: 'Clientes',
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon name="people" color={tintColor} size={22} />;
            },
        },
    },
    ProdutosTabs: {
        screen: ProdutosTab,
        navigationOptions: {
            title: 'Produtos',
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon name="shopping-cart" color={tintColor} size={22} />;
            },
        },
    }
}, {
        tabBarComponent: TabBarBottom,
        tabBarOptions: {
            activeTintColor: '#000',
            inactiveTintColor: '#0005',
            style: {
                backgroundColor: '#ffbf00'
            },
            labelStyle: {
                fontSize: 14
            }
        }
    }
);

const NavegadorPilhas = StackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Home',
            headerLeft: <MenuButton />
        }
    },
    Ajuda: {
        screen: AjudaScreen,
        navigationOptions: {
            title: 'Ajuda',
            drawerLockMode: 'locked-closed'
        }
    },
    Relatorios: {
        screen: RelatoriosTabs,
        navigationOptions: {
            title: 'Relatórios',
            drawerLockMode: 'locked-closed'
        }
    }
}, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#ffbf00'
            }
        }
    }
);

const NavegadorMenu = DrawerNavigator({
    Pilhas: {
        screen: NavegadorPilhas,
        navigationOptions: {
            drawerLabel: 'Tela Inicial'
        }
    },
    Ajuda: {
        screen: AjudaScreen,
        navigationOptions: {
            drawerLabel: 'Ajuda'
        }
    },
    Relatorios: {
        screen: RelatoriosTabs,
        navigationOptions: {
            drawerLabel: 'Relatórios'
        }
    }
})

export default NavegadorMenu;

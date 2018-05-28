import React, { Component } from 'react';
import {
    View, Text, FlatList,
    Switch, Platform, TouchableOpacity,
    Alert, ActivityIndicator
} from 'react-native';
const { OS } = Platform;

import moment from 'moment';
import axios from 'axios';
import { SearchBar, Card, Divider } from 'react-native-elements';

import FloatActionButton from '../components/FloatActionButton';
import Colors from '../values/Colors';

const SwitchStyle = OS === 'ios' ? { transform: [{ scaleX: .7 }, { scaleY: .7 }] } : undefined;

const TarefaItem = ({ tarefa, onAtivaChange, onTarefaPress, onTarefaLongPress }) => {
    return (
        <Card containerStyle={{ padding: 0 }}>
            <TouchableOpacity
                onPress={() => onTarefaPress(tarefa.id)}
                onLongPress={() => onTarefaLongPress(tarefa.id)}>

                <View style={{ paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row' }}>
                    <Text style={{ color: Colors.textSecondaryDark, fontSize: 14, flex: 1 }}
                    >#{tarefa.id}</Text>
                    <Text style={{ color: Colors.textSecondaryDark, fontSize: 14, }}
                    >{moment(tarefa.data).format('DD/MM/YYYY [às] HH:mm')}</Text>
                </View>

                <Divider />

                <View style={{ paddingHorizontal: 24, paddingVertical: 8 }}>
                    <Text
                        style={{ color: Colors.textPrimaryDark, fontSize: 18 }}
                    >{tarefa.titulo}</Text>
                </View>

                <Divider />

            </TouchableOpacity>

            <View style={{ paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row', alignItems: 'center' }}>
                <Text
                    style={{ color: Colors.textSecondaryDark, fontSize: 14, flex: 1 }}
                >{tarefa.ativa ? "Concluída" : "Pendente"}</Text>
                <Switch value={tarefa.ativa} style={SwitchStyle} onValueChange={value => onAtivaChange(tarefa.id, value)} />
            </View>
        </Card>
    )
}

export default class TarefasScreen extends Component {

    termoBusca = '';
    state = {
        tarefas: [],
        refreshing: false,
        carregando: false,
        carregarMais: false,
        pagina: 1,
    };

    componentDidMount() {
        this.setState({ refreshing: true });
        this.getTarefas();
    }

    getTarefas = () => {
        const { busca, pagina, tarefas } = this.state;

        axios.get('/tarefas', {
            params: {
                page: pagina,
                limite: 10,
                titulo: busca,
            }
        }).then(response => {
            console.log(response.data)
            const novasTaregas = pagina === 1
                ? response.data.data
                : tarefas.concat(response.data.data);
            const total = response.data.meta.total;
            this.setState({
                tarefas: novasTaregas,
                refreshing: false,
                carregando: false,
                carregarMais: novasTaregas.length < total
            })
        }).catch(ex => {
            console.warn(ex);
            console.warn(ex.response);
            this.setState({
                refreshing: false,
                carregando: false,
            });
        })
    }

    onBuscaChange = (text) => {
        clearTimeout(this.buscaTimeout);
        this.termoBusca = text;
        this.setState({
            pagina: 1,
            busca: text,
            refreshing: true,
        })
        this.buscaTimeout = setTimeout(() => {
            this.getTarefas();
        }, 500);
    }

    onAtivaChange = (tarefaId, ativa) => {
        this.setState({ refreshing: true });

        let axiosMethod;
        if (ativa) {
            axiosMethod = axios.put(`/tarefas/${tarefaId}/ativa`);
        } else {
            axiosMethod = axios.delete(`/tarefas/${tarefaId}/ativa`);
        }
        axiosMethod.then(response => {

            const tarefas = [...this.state.tarefas];
            const tarefa = tarefas.find(tarefa => tarefa.id === tarefaId);
            tarefa.ativa = ativa;
            this.setState({
                tarefas,
                refreshing: false,
            });

        }).catch(ex => {
            console.warn(ex, ex.response);
            this.setState({ refreshing: false });
        })
    }

    onRefresh = () => {
        this.setState({
            pagina: 1,
            refreshing: true,
        }, this.getTarefas);
    }

    onTarefaPress = (tarefaId) => {
        axios.get('/tarefas/' + tarefaId)
            .then(response => {
                this.props.navigation.navigate('TarefaScreen', { tarefa: response.data, onRefresh: this.onRefresh });
            }).catch(ex => {
                console.warn(ex);
                console.warn(ex.response);
            });
    }

    onAddPress = () => {
        this.props.navigation.navigate('TarefaScreen', { tarefa: {}, onRefresh: this.onRefresh });
    }

    onExcluirTarefa = (tarefaId) => {
        this.setState({ refreshing: true });

        axios.delete('/tarefas/' + tarefaId)
            .then(response => {

                const tarefas = [...this.state.tarefas];
                const index = tarefas.findIndex(tarefa => tarefa.id === tarefaId);
                tarefas.splice(index, 1);
                this.setState({
                    tarefas,
                    refreshing: false
                });

            }).catch(ex => {
                console.warn(ex);
                console.warn(ex.response);
                this.setState({ refreshing: false });
            })
    }

    onTarefaLongPress = (tarefaId) => {
        Alert.alert("Excluir tarefa", `Deseja excluir a tarefa ${tarefaId}?`, [
            { text: "Cancelar" },
            { text: "Excluir", onPress: () => this.onExcluirTarefa(tarefaId), style: "destructive" }
        ])
    }

    carregarMaisTarefas = () => {
        const { carregarMais, refreshing, carregando, pagina } = this.state;
        console.log({ carregarMais, refreshing, carregando, pagina });
        if (carregarMais && !refreshing && !carregando) {
            this.setState({
                carregando: true,
                pagina: pagina + 1,
            }, this.getTarefas);
        }
    }

    renderListFooter = () => {
        const { carregando } = this.state;

        if (carregando) {
            return (
                <View style={{ marginTop: 8 }}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }

        return null;
    }

    renderItem = ({ item, index }) => {
        return (
            <TarefaItem tarefa={item} onAtivaChange={this.onAtivaChange}
                onTarefaPress={this.onTarefaPress} onTarefaLongPress={this.onTarefaLongPress} />
        )
    }

    render() {
        const { tarefas, refreshing } = this.state;
        return (
            <View style={{ flex: 1, }}>
                <SearchBar lightTheme={true} round={true}
                    containerStyle={{ width: '100%', }}
                    icon={{ size: 18, style: { paddingTop: 5 } }}
                    placeholder="Busca por título"
                    inputStyle={{ color: Colors.textPrimaryDark, fontSize: 18, height: 40, padding: 0, }}
                    onChangeText={this.onBuscaChange} />

                <FlatList
                    data={tarefas}
                    renderItem={this.renderItem}
                    contentContainerStyle={{ paddingBottom: 80 }}
                    keyExtractor={tarefa => String(tarefa.id)}
                    onRefresh={this.onRefresh}
                    refreshing={refreshing}
                    onEndReached={this.carregarMaisTarefas}
                    ListFooterComponent={this.renderListFooter}
                />

                <FloatActionButton
                    iconFamily="MaterialIcons"
                    iconName="add"
                    iconColor={Colors.textOnAccent}
                    onPress={this.onAddPress}
                    backgroundColor={Colors.accent}
                />
            </View>
        )
    }
}
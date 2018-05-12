import React, { Component } from 'react';

import {
    Table, Alert, Button, Icon, Input,
    Switch, Modal,
} from 'antd';
import axios from 'axios';
import moment from 'moment';

import './TarefasPage.css';
import TarefaForm from '../components/TarefaForm';

const { Column } = Table;
const ButtonGroup = Button.Group;
const { Search } = Input;

export default class TarefasPage extends Component {

    state = {
        carregando: false,
        tarefas: [],
        pagina: 1,
        limite: 20,
        total: 0
    }

    componentDidMount() {
        this.getTarefas();
    }

    componentDidUpdate(antProps, antState) {
        const { total, pagina, limite } = this.state;
        const ultimaPagina = Math.ceil(total / limite);
        if (pagina > ultimaPagina) {
            this.setState({
                pagina: ultimaPagina
            }, this.getTarefas)
        }
    }

    getTarefas = () => {
        this.setState({ carregando: true });

        const { busca, limite, pagina } = this.state;

        axios
            .get('/tarefas', {
                params: {
                    page: pagina,
                    limite: limite,
                    titulo: busca,
                }
            })
            .then(response => {
                const { data, meta } = response.data;
                this.setState({
                    tarefas: data,
                    carregando: false,
                    mensagemErro: '',
                    total: meta.total,
                    pagina: meta.current_page,
                    limite: Number(meta.per_page),
                });
            })
            .catch(error => {
                console.warn(error);
                this.setState({
                    carregando: false,
                    mensagemErro: 'Não foi possível obter as tarefas',
                });
            })
    }

    onEditarClick = (tarefa) => {
        this.setState({ carregando: true });
        axios.get(`/tarefas/${tarefa.id}`)
            .then(response => {
                const { data } = response;
                this.setState({
                    formVisivel: true,
                    tarefaSelecionada: data,
                    carregando: false,
                })
            })
            .catch(error => {
                console.warn(error);
                this.setState({
                    carregando: false,
                    mensagemErro: 'Não foi possível consultar a tarefa selecionada.'
                });
            })
    }

    onExcluirClick = (tarefa) => {
        Modal.confirm({
            title: 'Confirmação de exclusão',
            content: `Deseja excluir a tarefa #${tarefa.id}?`,
            okText: 'Sim',
            cancelText: 'Não',
            onOk: () => {
                this.setState({ carregando: true });

                axios.delete(`/tarefas/${tarefa.id}`)
                    .then(response => {
                        const { tarefas, total } = this.state;
                        const tarefaIndex = tarefas.findIndex(tar => tar.id === tarefa.id);
                        tarefas.splice(tarefaIndex, 1);
                        this.setState({
                            tarefas: tarefas.concat([]),
                            total: total - 1,
                            carregando: false,
                        });
                    }).catch(error => {
                        console.warn(error);
                        this.setState({
                            carregando: false,
                            mensagemErro: 'Não foi possível excluir a tarefa selecionada.'
                        });
                    });
            }
        });
    }

    onAdicionarClick = () => {
        this.setState({
            formVisivel: true,
            tarefaSelecionada: {}
        });
    }

    onCancelarClick = () => {
        this.setState({
            formVisivel: false
        });
    }

    onSalvarClick = (tarefa) => {
        this.setState({ salvando: true });

        let request;
        if (tarefa.id) {
            // editar
            request = axios.put(`/tarefas/${tarefa.id}`, tarefa);
        } else {
            // cadastrar
            request = axios.post('/tarefas', tarefa);
        }
        request
            .then(response => {
                this.getTarefas();
                this.setState({
                    formVisivel: false,
                    salvando: false,
                })
            })
            .catch(error => {
                console.warn(error);
                this.setState({ salvando: false });
                Modal.error({
                    title: 'Erro inesperado',
                    content: 'Não foi possível salvar a tarefa.',
                    okText: 'Ok',
                });
            });
    }

    onBuscar = (texto) => {
        this.setState({
            busca: texto
        }, this.getTarefas);
    }

    onAtivaChange = (tarefa, ativar) => {
        this.setState({
            carregando: true
        })

        let request;
        if (ativar) {
            // put /tarefas/{tarefaId}/ativar
            request = axios.put(`/tarefas/${tarefa.id}/ativa`);
        } else {
            // delete /tarefas/{tarefaId}/ativar
            request = axios.delete(`/tarefas/${tarefa.id}/ativa`);
        }
        request.then(response => {
            tarefa.ativa = ativar;
            this.setState({
                tarefas: this.state.tarefas.concat([]),
                carregando: false
            })
        }).catch(error => {
            console.warn(error);
            this.setState({
                mensagemErro: 'Não foi possível atualizar esta tarefa, tente novamente mais tarde.',
                carregando: false
            })
        })
    }

    onTabelaChange = (pagination) => {
        this.setState(
            {
                pagina: pagination.current,
                limite: pagination.pageSize,
            },
            this.getTarefas
        );
    }

    renderAtiva = (ativa, tarefa) => {
        return (
            <Switch
                checkedChildren="Ativa"
                unCheckedChildren="Inativa"
                checked={ativa}
                onChange={(ativar) => this.onAtivaChange(tarefa, ativar)}
            />
        )
    }

    renderAcoes = (text, tarefa) => {
        return (
            <ButtonGroup size="small">

                <Button
                    onClick={() => this.onEditarClick(tarefa)}
                >
                    Editar
                </Button>

                <Button
                    onClick={() => this.onExcluirClick(tarefa)}
                    type="danger">
                    Excluir
                </Button>

            </ButtonGroup>
        );
    }

    renderData = (data, tarefa) => {
        const dataMoment = moment(data);
        return (
            <span
                title={dataMoment.format('DD [de] MMMM [de] YYYY [às] HH:mm')}
            >
                {dataMoment.fromNow(true)}
            </span>
        )
    }

    render() {
        const {
            tarefas, carregando, mensagemErro,
            salvando, formVisivel, tarefaSelecionada,
            total, pagina, limite
        } = this.state;

        return (
            <div>
                <h2>Tarefas</h2>

                {mensagemErro ? (
                    <Alert message={mensagemErro} type="error" closable />
                ) : null}

                <div className="tarefasPageFiltro" >
                    <Button
                        type="primary"
                        onClick={this.onAdicionarClick}
                        className="tarefasPageFiltro-adicionar"
                    >
                        Adicionar
                    </Button>

                    <Search
                        className="tarefasPageFiltro-busca"
                        placeholder="Buscar por título"
                        onSearch={this.onBuscar}
                        enterButton
                    />
                </div>

                <TarefaForm
                    visivel={formVisivel}
                    onSalvarClick={this.onSalvarClick}
                    onCancelarClick={this.onCancelarClick}
                    carregando={salvando}
                    tarefaSelecionada={tarefaSelecionada}
                />

                <Table
                    pagination={{
                        total: total,
                        pageSize: limite,
                        current: pagina,
                        pageSizeOptions: ['10', '20', '30', '40'],
                        showSizeChanger: true,
                    }}
                    onChange={this.onTabelaChange}
                    dataSource={tarefas}
                    loading={{
                        spinning: carregando,
                        tip: 'Carregando, aguarde ...',
                        size: "large",
                    }}
                    scroll={{ x: 600 }}
                    rowKey={(tarefa) => tarefa.id}
                >
                    <Column
                        key="id"
                        dataIndex="id"
                        title="#"
                    />
                    <Column
                        key="titulo"
                        dataIndex="titulo"
                        title="Título"
                    />
                    <Column
                        key="data"
                        dataIndex="data"
                        title="Criada há"
                        render={this.renderData}
                    />
                    <Column
                        key="ativa"
                        dataIndex="ativa"
                        title="Ativa"
                        render={this.renderAtiva}
                    />
                    <Column
                        key="acoes"
                        title="Ações"
                        render={this.renderAcoes}
                    />
                </Table>
            </div>
        );
    }
}
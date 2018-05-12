import React, { Component } from 'react';

import { Modal, Form } from 'antd';

import { checkFormIsValid } from '../utils/Validator';
import InputForm from './InputForm';

export default class TarefaForm extends Component {

    state = {
        tarefa: {
            id: '',
            titulo: '',
            descricao: '',
        }
    }

    componentDidUpdate(propsAnt, stateAnt) {
        if (this.props.tarefaSelecionada !== propsAnt.tarefaSelecionada) {
            this.setState({
                tarefa: this.props.tarefaSelecionada
            }, () => {
                this.refs.titulo.focus();
            });
        }
    }

    onChange = (event) => {
        const { id, value } = event.target;

        const { tarefa } = this.state;
        tarefa[id] = value;

        this.setState({
            tarefa
        })
    }

    onOk = () => {
        if (checkFormIsValid(this.refs)) {
            this.props.onSalvarClick(this.state.tarefa);
        }
    }

    render() {
        const { onSalvarClick, onCancelarClick, visivel, carregando } = this.props;
        const { id, titulo, descricao } = this.state.tarefa;
        return (
            <Modal
                visible={visivel}
                title={id ? "Edição de Tarefa" : "Cadastro de Tarefa"}
                okText="Salvar"
                cancelText="Cancelar"
                confirmLoading={carregando}
                onOk={this.onOk}
                onCancel={onCancelarClick}
                destroyOnClose
            >
                <Form>
                    {id ? (
                        <InputForm
                            id="id"
                            label="#"
                            disabled
                            value={id}
                        />
                    ) : null}

                    <InputForm
                        id="titulo"
                        ref="titulo"
                        label="Título"
                        maxLength={50}
                        required
                        validator={value => Boolean(value)}
                        errorMessage="Informe o título da tarefa"
                        onChange={this.onChange}
                        value={titulo}
                    />
                    <InputForm
                        id="descricao"
                        ref="descricao"
                        label="Descrição"
                        type="textarea"
                        rows="4"
                        maxLength={4000}
                        required
                        validator={value => Boolean(value)}
                        errorMessage="Informe a descrição da tarefa"
                        onChange={this.onChange}
                        value={descricao}
                    />
                </Form>
            </Modal>
        );
    }

}
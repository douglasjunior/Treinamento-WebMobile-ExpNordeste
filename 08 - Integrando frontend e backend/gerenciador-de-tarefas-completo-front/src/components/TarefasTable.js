import React from 'react';

import moment from 'moment';
import { Table, Button, Switch } from 'antd';

const { Column } = Table;

export default (props) => {
    const { tarefas, onConcluidaChange, onExcluirClick, onEditarClick } = props;

    return (
        <Table rowKey={tarefa => tarefa.id} dataSource={tarefas} pagination={false} >
            <Column
                title='#'
                dataIndex='id'
                key='id'
            />
            <Column
                title='Título'
                dataIndex='titulo'
                key='titulo'
            />
            <Column
                title='Criado em'
                dataIndex='data'
                key='data'
                render={(text, tarefa) => (
                    <span>
                        {moment(tarefa.data).format('DD/MM/YYYY')}
                    </span>
                )}
            />
            <Column
                title='Ativa'
                dataIndex='ativa'
                key='ativa'
                render={(text, tarefa) => (
                    <Switch checked={tarefa.ativa}
                        onChange={checked => onConcluidaChange(tarefa.id, checked)} />
                )}
            />
            <Column
                title='Opções'
                key='opcoes'
                render={(text, tarefa) => (
                    <Button.Group size="small">
                        <Button type="ghost" onClick={() => onEditarClick(tarefa.id)}>Editar</Button>
                        <Button type="danger" onClick={() => onExcluirClick(tarefa.id)}>Excluir</Button>
                    </Button.Group>
                )}
            />
        </Table>
    );
}

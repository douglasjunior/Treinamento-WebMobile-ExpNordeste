import React, { Component } from 'react';

class TarefasPage extends Component {

    render() {
        let tarefaId;
        if (this.props.match.params) {
            tarefaId = this.props.match.params.tarefaId;
        }
        return (
            <div className="paginaAbsoluta">
                <h1>Listagem de tarefas!</h1>
                <h2>{tarefaId}</h2>
            </div>
        )
    }

}

export default TarefasPage;

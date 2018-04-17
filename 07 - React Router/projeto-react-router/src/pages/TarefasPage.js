import React, { Component } from 'react';

class TarefasPage extends Component {

    render() {
        let tarefaId;
        if (this.props.match.params) {
            tarefaId = this.props.match.params.tarefaId;
        }
        return (
            <div>
                <h1>Listagem de tarefas!</h1>
                <h2>{tarefaId}</h2>
            </div>
        )
    }

}

export default TarefasPage;

import React, { Component } from 'react';

import { Button } from 'reactstrap';

class Contador extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contador: 0,
            autoIncremento: props.tempo > 0
        }
    }

    // shouldComponentUpdate(nextPros, nextState) {
    //     return nextState.contador % 1000 === 0;
    // }

    componentDidMount() {
        if (this.state.autoIncremento) {
            this.intervalContador = setInterval(this.incrementar, this.props.tempo);
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalContador);
    }

    incrementar = () => {
        this.setState({ contador: this.state.contador + 1 })
    }

    decrementar = () => {
        this.setState({ contador: this.state.contador - 1 })
    }

    renderBotoes = () => {
        if (this.state.autoIncremento) {
            return null;
        }

        return (
            <div>
                <Button color="primary" style={{ width: 50, height: 50 }} onClick={this.incrementar}>
                    +
                </Button>
                <Button color="danger" style={{ width: 50, height: 50, marginLeft: 8 }} onClick={this.decrementar}>
                    -
                </Button>
            </div>
        )
    }

    render() {
        return (
            <p>
                {this.state.contador}

                {this.renderBotoes()}
            </p>
        );
    }

}

export default Contador;

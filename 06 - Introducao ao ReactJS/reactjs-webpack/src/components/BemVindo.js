import React from 'react';

function BemVindo(props) {
    return (
        <h1 style={{
            backgroundColor: '#000',
            color: '#fff'
        }}>
            Olá, {props.nome}
        </h1>
    );
}

export default BemVindo;

import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import UsuarioLogado from '../utils/UsuarioLogado';

const PrivateRoute = (props) => {
    const Component = props.component;
    const path = props.path;
    const exact = props.exact;
    return (
        <Route path={path}
            exact={exact}
            render={(props) => {
                if (UsuarioLogado.estaLogado()) {
                    return (
                        <Component {...props} />
                    );
                }
                return (
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
                );
            }}
        />
    );
}

export default PrivateRoute;

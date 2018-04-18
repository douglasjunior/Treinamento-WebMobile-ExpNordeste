import React from 'react';

import { Route, Link } from 'react-router-dom';

const CustomLink = (props) => {
    const { label, to, exact } = props;
    return (
        <Route path={to} exact={exact}
            children={(props) => {
                const { match } = props;
                return (
                    <div className={match ? 'ativo' : null}>
                        {match ? '> ' : null}
                        <Link to={to}>{label}</Link>
                    </div>
                );
            }}
        />
    )

}

export default CustomLink;

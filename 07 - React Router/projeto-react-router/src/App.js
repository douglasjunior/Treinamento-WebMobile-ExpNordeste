import React, { Component } from 'react';

import 'animate.css/animate.css';
import './App.css';

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import PrivateRoute from './components/PrivateRoute';
import UsarioLogado from './utils/UsuarioLogado';

import HomePage from './pages/HomePage';
import SobrePage from './pages/SobrePage';
import TarefasPage from './pages/TarefasPage';
import LoginPage from './pages/LoginPage';
import DesconhecidoPage from './pages/DesconhecidoPage';

import UsuarioLogado from './utils/UsuarioLogado';
import Menu from './components/Menu';

class App extends Component {

  render() {
    const { location } = this.props;
    return (
      <Router>
        <div>

          <Menu />

          <div style={{ position: 'relative' }}>
            <Route
              render={({ location }) => (
                <TransitionGroup>
                  <CSSTransition
                    key={location.key}
                    classNames={{
                      enter: 'animated fade-enter',
                      exit: 'animated fade-exit',
                      enterActive: 'rollIn',
                      exitActive: 'rollOut',
                    }}
                    timeout={{ enter: 1000, exit: 2000 }}
                  >
                    <Switch
                      location={location}
                      key={location.key}
                    >

                      <Route exact path="/" component={HomePage} />
                      <PrivateRoute exact path="/tarefas" component={TarefasPage} />
                      <PrivateRoute path="/tarefas/:tarefaId" component={TarefasPage} />
                      <Route path="/sobre" component={SobrePage} />
                      <Route path="/login" component={LoginPage} />
                      <Route component={DesconhecidoPage} />

                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              )}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import SobrePage from './pages/SobrePage';
import TarefasPage from './pages/TarefasPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="App">
            <ul style={{ listStyle: 'none' }}>
              <li>
                <Link to="/" >Home</Link>
              </li>
              <li>
                <Link to="/tarefas" >Tarefas</Link>
              </li>
              <li>
                <Link to="/sobre" >Sobre</Link>
              </li>
            </ul>
          </div>

          <Route exact path="/" component={HomePage} />
          <Route exact path="/tarefas" component={TarefasPage} />
          <Route path="/tarefas/:tarefaId" component={TarefasPage} />
          <Route path="/sobre" component={SobrePage} />
        </div>
      </Router>
    );
  }
}

export default App;

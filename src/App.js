import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './login/login';
import Portal from './portal/portal';

function App() {
  return (
    <div className="App">
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/portal' component={Portal}/>
        </Switch>
    </div>
  );
}

export default App;

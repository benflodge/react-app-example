import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/home" component={Home} />
            </Switch>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));

/*
 * 应用的根组件
 */
import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './pages/login';
import Admin from './pages/admin';
import './api/ajax';
class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Admin}/>
                </Switch>
            </Router>
        );
    }
}

export default App

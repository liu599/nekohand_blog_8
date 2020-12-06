import React, { Component } from 'react'
import { Switch, Route } from '@symph/joy/router'
import AppController from './controllers/AppController'
import './common/styles/normalize.css';
import './common/styles/main.less';
import Player from './components/player';
import component404 from './_error.js';


export default class Main extends Component {

    render () {
        return (
                <AppController>
                    <Switch>
                        <Route exact path="/" component={Player.Player}/>
                        <Route component={component404} />
                    </Switch>
                </AppController>

        )
    }
}
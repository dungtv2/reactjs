import React, { Component } from 'react';
const U = require('react-addons-update');

import { Pp } from './../Base/BaseComponent.js';
import { ControlPanel } from './../Component/ControlPanel.js'
import { ViewManager } from './../Component/ViewManager.js'
import classNames from 'classnames';


class Application extends Component {
    constructor(props) {
        super(props);
        this.change_view_manager = this.change_view_manager.bind(this);
    }
    change_view_manager(view_type){
        this.app.App.changeState(U(this.app.App.state, {current_view: {$set: view_type}}));
    }
    render() {
        return (
            <div id="app-application">
                <ControlPanel app={this.app} />
                <ViewManager app={this.app} />
            </div>
        )
    }
}

module.exports = {Application: Pp(Application)}
import React, { Component } from 'react';
import { Pp } from './Base.js';
import classNames from 'classnames';


class Container extends Component {
    constructor(props) {
        super(props);
        this.onClickMenu = this.onClickMenu.bind(this);
    }
    onClickMenu(item) {
        // do something here
        this.app.App.changeState(U(this.app.App.state, {current_child_menu: {$set: item.model}}));
    }
    __onBeforeRender() {
        this.model = this.props.app.App.model_data[this.props.app.App.state.current_child_menu];
    }
    render() {
        return (
            <div id="app-container" style={{height: "calc(100% - 34px)"}}>
                <LeftBar app={this.app} />
                <Application app={this.app} />
            </div>
        )
    }
}

module.exports = {MenuItem: Pp(MenuItem)}
import React, { Component } from 'react';
import reactMixin from 'react-mixin'
import styles from './App.css';
import styleok from './ok.less';
import styleok1 from './lala.less';
import {createStore, applyMiddleware} from 'redux';
var U = require('react-addons-update');
var Q = require('q');
var R = require('ramda');
// var update = require('react-update');
import {MainMenu, Container} from './MyComponent.js'
import { Pp } from './Base.js'


class App extends Component {
    constructor(props) {
        super(props);
        this.onClickMenu = this.onClickMenu.bind(this);
        this.changeState = this.changeState.bind(this);
        this.__init__();
    }
    __init__(){
        /*
        *
        * */
        this.menu = {home: {label: "Home", display: "block", href: "/home", active: "active", name: "home", isParent: true,
                            child: {home:
                                {label: "Home", href: "/home/home", display: "block", active: "active", model: "home", isParent: false},
                                config: {label: "Configuration", href: "/home/config", display: "block", active: "no-active", model: "config", isParent: false}},
                    },
                    users: {label: "User", display: "block", href: "/users", active: "no-active", name: "users", isParent: true,
                            child: {user:
                                {label: "User", href: "/users/user", display: "block", active: "active", model: "user", isParent: false},
                                config: {label: "Configuration", href: "/users/config", display: "block", active: "no-active", model: "config", isParent: false}},

                    },
                    settings: {label: "Settings", display: "block", href: "/settings", active: "no-active", name: "settings", isParent: true,
                            child: []}};
        this.model_data = {home: {title: "Home"},
                           user: {title: "User"},
                           config: {title: "Configuration"}}
        /*
        * current_nav_main: is current main menu (default is "home")
        * current_child_menu: is current Left Menu
        * current_view: is current View Manager (default is tree view)
        * */
        this.state = {current_nav_main: "home", current_child_menu: "home", current_view: "tree",
                      active_id: false, active_model: ""}
    }
    onClickMenu(menu) {
        if (menu.isParent){
            this.menu[this.state.current_nav_main].active = "no-active";
            this.menu[menu.name].active = "active";
            this.setState(U(this.state, {current_nav_main: {$set: menu.name}}));
        }else{
            // do something here
        }
    }
    changeState(newState){
        this.setState(newState);
    }
    render() {
        return (
            <div id="app">
                <MainMenu app={this.app} />
                <Container app={this.app} />
            </div>
        );
    }
}

module.exports = {App: Pp(App)}

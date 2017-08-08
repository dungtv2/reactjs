import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import {string, object, bool} from 'prop-types';
// {tab: , group: , string: , type: , readOnly: , placeholder: , }


export class Field extends Component{
    state = {}
    static propTypes = {
        tab: string,
        group: string,
        string: string,
        type: string,
        readOnly: bool,
        placeholder: string,
    }
    static defaultProps = {
        type: 'input'
    }
    _prepare_render = () => {

    }
    render() {
        return (<div>ABC</div>)
    }
}

class User extends Component {
    state = {}
    defaultTypes = {
        model: string,
        master: object,
        tabs: object,
        field: object,
    }
    defaultProps = {
        model: "users",
        master: {col: 3, groups: {group1: {label: "Master1"}, group2: {label: "Master2"}}},
        tabs: {tab1: {label: "Order Line", active: "active", col: 3,
                      groups: {group1: {label: "Group 1"}, group2: {label: "Group 2"}, group3: {label: "Group 3"}}},
               tab2: {label: "Other", active: "no-active"}},
        field: {name: {group: "group1", string: "Name", type: "input", readOnly: true, placeholder: "name ok ....", name: "nameok"},
                age: {string: "Age", type: "int", placeholder: "age ok .....", name: "ageok", display: "block"},
                nothing: {group: "group2", string: "Nothing", type: "input", placeholder: "nothing .....", name: "nothing"},
                address: {tab: "tab1", group: "group1", string: "Address", type: "input", placeholder: "address...", name: "address"},
                zip: {tab: "tab1", group: "group2", string: "Zip", type: "input", placeholder: "zip...", name: "zip"},
                birthday: {tab: "tab1", group: "group3", string: "Birthday", type: "input", placeholder: "Birthday...", name: "birthday"},
                sex: {tab: "tab1", group: "group3", string: "Sex", type: "input", default: "Male", placeholder: "sex...", name: "sex"},
                country: {tab: "tab2", group: "group1", string: "Country", type: "input", placeholder: "country...", name: "country"},
                date: {tab: "tab1", string: "Date", type: "input", placeholder: "date...", name: "date", display: "block"},
                state: {string: "State", selection: {draft: "Draft", confirm: "Confirm", done: 'Done'}, default: "draft"}
        }
    }
    constructor(props){
        super(props)
    }
    btnConfirm = () => {
        alert('Confirm');
    }
    btnValidate = () => {
        alert('validate');
    }
    render() {
        return (
            <div style={{float: "left", paddingLeft: "10px"}}>
                <button onClick={this.btnConfirm} className="btn btn-sm btn-default">Confirm</button>
                <button onClick={this.btnValidate} className="btn btn-sm btn-default ml-5">Validate</button>
            </div>
        )
    }
}



User = Pp(User);

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
                                config: {label: "Configuration", href: "/home/config", display: "block", active: "", model: "config", isParent: false}},
                    },
                    users: {label: "User", display: "block", href: "/users", active: "", name: "users", isParent: true,
                            child: {user:
                                {label: "User", href: "/users/user", display: "block", active: "active", model: "user", isParent: false},
                                config: {label: "Configuration", href: "/users/config", display: "block", active: "", model: "config", isParent: false}},

                    },
                    settings: {label: "Settings", display: "block", href: "/settings", active: "", name: "settings", isParent: true,
                            child: []}};


        this.model_data = {home: {title: "Home",
                                  tabs: {tab1: {label: "Order Line", active: "active"}, tab2: {label: "Other", active: "no-active"}},
                                  field: {name: {string: "Name", type: "input", placeholder: "Name...", name: "name"},
                                          age: {string: "Age", type: "int", placeholder: "age...", name: "age"}}},
                           user: {title: "User",
                                  master: {col: 3, groups: {group1: {label: "Master1"}, group2: {label: "Master2"}}},
                                  tabs: {tab1: {label: "Order Line", active: "active", col: 3,
                                                groups: {group1: {label: "Group 1"}, group2: {label: "Group 2"}, group3: {label: "Group 3"}}},
                                         tab2: {label: "Other", active: "no-active"}},
                                  // {tab: , group: , string: , type: , readOnly: , placeholder: , }
                                  field: {name: {group: "group1", string: "Name", type: "input", readOnly: true, placeholder: "name ok ....", name: "nameok"},
                                          age: {string: "Age", type: "int", placeholder: "age ok .....", name: "ageok", display: "block"},
                                          nothing: {group: "group2", string: "Nothing", type: "input", placeholder: "nothing .....", name: "nothing"},
                                          address: {tab: "tab1", group: "group1", string: "Address", type: "input", placeholder: "address...", name: "address"},
                                          zip: {tab: "tab1", group: "group2", string: "Zip", type: "input", placeholder: "zip...", name: "zip"},
                                          birthday: {tab: "tab1", group: "group3", string: "Birthday", type: "input", placeholder: "Birthday...", name: "birthday"},
                                          Sex: {tab: "tab1", group: "group3", string: "Sex", type: "input", default: "Male", placeholder: "sex...", name: "sex"},
                                          country: {tab: "tab2", group: "group1", string: "Country", type: "input", placeholder: "country...", name: "country"},
                                          date: {tab: "tab1", string: "Date", type: "input", placeholder: "date...", name: "date", display: "block"},
                                          state: {string: "State", selection: {draft: "Draft", confirm: "Confirm", done: 'Done'}, default: "draft"}
                                  }},
                           config: {title: "Configuration",
                                    field: {name: {string: "Name", type: "input", placeholder: "name not ok...", name: "namenot"},
                                            age: {string: "Age", type: "int", placeholder: "age not ok....", name: "agenot"}}}}


        this.data_form = {1: {name: "Dung", age: 25}, 2: {name: "Linh", age: 22}}
        /*
        * current_nav_main: is current main menu (default is "home")
        * current_child_menu: is current Left Menu
        * current_view: is current View Manager (default is tree view)
        * */
        this.form_type = {view: "view", edit: "edit", create: "create"}
        this.state = {current_nav_main: "home", current_child_menu: "home", current_view: "tree",
                      active_id: false, active_model: "", form_type: this.form_type.create};
        this.readURL();
    }
    __onBeforeRender() {
        // SET url
        let hash = "menu_name="+this.state.current_nav_main+"&model="+this.state.current_child_menu+"&view_type="+this.state.current_view;
        if (this.state.active_id && this.state.current_view === 'form'){
            hash += "&active_id="+this.state.active_id;
        }
        window.location.hash = hash;
    }
    readURL() {
        var self = this;
        var hash = window.location.hash || "#";
        hash = hash.substring(1).split("&");
        hash.map(function (value) {
            value = value.split("=");
            if (value.length == 2) {
                switch (value[0]) {
                    case "menu_name":
                        self.state.current_nav_main = value[1];
                        break;
                    case "model":
                        self.state.current_child_menu = value[1];
                        break;
                    case "view_type":
                        self.state.current_view = value[1];
                        break;
                    case "active_id":
                        if (value[1]){
                            self.state.active_id = value[1];
                        }
                        break;
                }
            }
        })
    }
    onClickMenu(menu) {
        if (menu.isParent){
            this.menu[this.state.current_nav_main].active = "no-active";
            this.menu[menu.name].active = "active";
            this.setState(U(this.state, {current_nav_main: {$set: menu.name}, current_view: {$set: "tree"}}));
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
// App.propTypes = {
//     name: PropTypes.string, children: PropTypes.element.isRequired
// };
module.exports = {App: Pp(App)}

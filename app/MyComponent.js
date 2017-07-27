import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reactMixin from 'react-mixin'
import styles from './App.css';
import styleok from './ok.less';
import styleok1 from './lala.less';
import {createStore, applyMiddleware} from 'redux';
import classNames from 'classnames';
import {Button} from 'react-bootstrap';
var U = require('react-addons-update');
var Q = require('q');
var R = require('ramda');
// var update = require('react-update');



import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import {FormView, TreeView} from './widget.js'
import { Pp } from './Base.js'
const loggerMiddleware = createLogger();

export class Promise {
    constructor (params) {
        this.params = params || {};
        this.method = "GET";
        this.expect = "TEXT";
        this.data = null
        this.start();
    }
    /**
     * Write attribute for class
     **/
    start() {
        for (let [k, v] of Object.entries(this.params)){
            this[k] = v
        }
    }
    data_expect(data){
        if (data){
            switch (this.expect){
                case "TEXT":
                    data = data.text();
                    break;
                case "JSON":
                    data = data.json();
                    break;
                case "BLOB":
                    data = data.blob();
                    break;
                case "FORM":
                    data = data.formData();
                    break;
                case "ARRAY":
                    data = data.arrayBuffer();
                    break;
            }
            return data
        }
        return false
    }
    promise(){
        let self = this, params_fetch = {
            method: this.method,
            cache: 'default',
            body: this.data
        }
        return Q.fcall(function () {
            return fetch(self.url, params_fetch).then(res => {
                return self.data_expect(res);
            }).then(res => {
                return res
            }).catch(error => {
                throw error
            })
        });
    }
}


var defaultState = {}

class Action{
    static actionUnlink(){
        return {
            type: "UNLINK",
            message: "nothing",
            data: {}
        }
    }
    static actionCreate(){
        return {
            type: "CREATE",
            message: "nothing",
            data: {}
        }
    }
    static actionWrite(){
        return {
            type: "WRITE",
            message: "nothing",
            data: {}
        }
    }
    static actionSearch(){
        return {
            type: "SEARCH",
            message: "nothing",
            data: {}
        }
    }
    static receiveData(data={}) {
        return {
            type: "RECEIVE",
            message: "nothing",
            data: data

        }
    }
    static fetchPosts(params={}){
        return function (){
            return (new Promise(params)).promise().then(function(data) {
                store.dispatch(Action.receiveData({data: data}));
            })
        };
    }
}
function MyReducer(state, action){
    let newState = {}
    switch (action.type){
        case "UNLINK":
            newState = Object.assign({}, state);
            return newState;
        case "CREATE":
            newState = Object.assign({}, state);
            return newState
        case "WRITE":
            newState = Object.assign({}, state);
            return newState;
        case "SEARCH":
            newState = Object.assign({}, state);
            return newState;
        case "RECEIVE":
            newState = Object.assign({}, state, {data: action.data})
            return newState
        default:
            return state
    }
}
var store = createStore(MyReducer, defaultState, applyMiddleware(thunkMiddleware, loggerMiddleware))

// function Pp(WrappedComponent){
//     const render = WrappedComponent.prototype.render;
//     WrappedComponent.prototype.render = function(){
//         if (this.__proto__.hasOwnProperty("__onBeforeRender")){
//             this.__onBeforeRender();
//         }
//         if (this.props.hasOwnProperty("app")) {
//             let self = Object.assign({}, this)
//             let app = Object.assign({}, this.props.app);
//             app[this.constructor.name] = self;
//             this.app = app;
//         }
//         return render.bind(this)();
//     }
//     return class BaseView extends Component {
//         constructor(props){
//             super(props);
//             this.setAppForComponent = this.setAppForComponent.bind(this);
//         }
//         setAppForComponent(wrappedComponentInstance) {
//             console.log("abc");
//         }
//         render () {
//             const injectedProp = this.setAppForComponent;
//             let newProps = Object.assign({}, this.props, {ref: this.setAppForComponent});
//             return <WrappedComponent injectedProp={injectedProp} {...newProps} />
//         }
//     }
// }

class MainMenu extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <nav id="nav-main">
                <div className="navbar-header"></div>
                <div className="navbar-collapse collapse">
                    <ul className="nav">
                        {Object.keys(this.app.App.menu).map((k) =>
                            <MenuItem app={this.app} key={k.toString()} item={this.app.App.menu[k]} />
                        )}
                    </ul>
                </div>
            </nav>
        )
    }
}

class MenuItem extends Component {
    constructor(props){
        super(props);
        this.onClickMenu = this.onClickMenu.bind(this);
    }
    onClickMenu(item){
        if (item.isParent){
            this.app.App.onClickMenu(item);
        }else{
            this.app.Container.onClickMenu(item);
        }
    }
    render(){
        let item = this.props.item;
        return (
            <li className={classNames(item.display, item.active)}>
                <a onClick={() => this.onClickMenu(item)}>
                    <span>{item.label}</span>
                </a>
            </li>
        )
    }
}

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

class LeftBar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        var menu_child = this.app.App.menu[this.app.App.state.current_nav_main].child;
        return (
            <div id="app-left">
                <ul>
                    {Object.keys(menu_child).map((k) => <MenuItem key={k} item={menu_child[k]} app={this.app} />)}
                </ul>
            </div>
        )
    }
}

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

class CPTitle extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="app-cp-title col-md-6">
                <ol className="app-view-title">
                    <li>{this.app.Container.model.title}</li>
                </ol>
            </div>
        );
    }
}

class CPSearchView extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="app-cp-search-view col-md-6">
                <div className="app-search-view form-control input-sm">
                    <div className="app-sv-search fa fa-lg fa-search" title="Search Again"></div>
                    <div className="app-sv-input">
                        <div></div>
                    </div>
                    <div className="app-sv-unfold fa fa-lg fa-fw fa-chevron-right fa-caret-down" title="Advanced Search..."></div>
                </div>
            </div>
        );
    }
}

class CPButton extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="">
                <button className="btn btn-sm btn-primary" onClick={this.btnLoadClick}>Create</button>
                <button className="btn btn-sm btn-default ml-5" onClick={this.btnLoadClick}>Import</button>
            </div>
        );
    }
}

class CPToolBar extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="app-toolbar">
                <div className="app-cp-pager">
                    <div className="app-cp-page-value">
                        <span>1-80 of 122</span>
                    </div>
                    <div className="btn-group btn-group-sm oe-pager-buttons">
                        <a type="button" title="" className="fa fa-chevron-left btn btn-default oe-pager-button" data-original-title="Tree"></a>
                        <a type="button" title="" className="fa fa-chevron-right btn btn-default oe-pager-button" data-original-title="Tree"></a>
                    </div>
                </div>
                <div className="app-cp-switch-buttons btn-group btn-group-sm">
                    <button type="button" onClick={() => this.props.app.Application.change_view_manager("tree")} title="" className="btn btn-default fa fa-list-ul oe-cp-switch-list active" data-original-title="Tree"></button>
                    <button type="button" onClick={() => this.props.app.Application.change_view_manager("kanban")} title="" className="btn btn-default fa fa-th-large oe-cp-switch-kanban" data-original-title="Kanban"></button>
                    <button type="button" onClick={() => this.props.app.Application.change_view_manager("form")} title="" className="btn btn-default fa fa-edit oe-cp-switch-form" data-original-title="Form"></button>
                </div>
            </div>
        );
    }
}

class CPFilter extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="app-cp-filter btn-group">
                <div className="btn-group btn-group-sm">
                    <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button" aria-expanded="false">
                        <span className="fa fa-filter"></span> Filters <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu filters-menu" role="menu">
                        <li data-index="0">
                            <a>
                                My Orders
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="btn-group btn-group-sm">
                    <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button" aria-expanded="false">
                        <span className="fa fa-bars"></span> Group By <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu filters-menu" role="menu">
                        <li data-index="0">
                            <a>
                                My Orders
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="btn-group btn-group-sm">
                    <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button" aria-expanded="true">
                        <span className="fa fa-star"></span> Favorites <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu filters-menu" role="menu">
                        <li data-index="0">
                            <a>
                                My Orders
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

class ControlPanel extends Component{
    constructor(props){
        super(props);
        this.btnLoadClick = this.btnLoadClick.bind(this);
    }
    btnLoadClick (){
        store.dispatch(Action.fetchPosts({url: '/list/1'})).then(function () {
            let new_state = store.getState();
        });
    }
    render() {
        return (
            <div className="app-control-panel">
                <div className="container-fluid">
                    <div className="row">
                        <CPTitle app={this.app} />
                        <CPSearchView />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <CPButton />
                        </div>
                        <div className="col-md-6">
                            <CPFilter />
                            <CPToolBar app={this.app} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class ViewManager extends Component{
    constructor(props){
        super(props)
        this.get_view = this.get_view.bind(this);
        this.store_view = {};
    }
    get_view(){
        switch (this.props.app.App.state.current_view){
            case "tree":
                this.store_view['tree'] = <TreeView app={this.app} />;
                break;
            case "form":
                this.store_view['form'] = <FormView app={this.app} />;
                break;
        }
        return this.store_view;
    }
    render() {
        return (
            <div className="app-view-manager">
                <div className="app-vm-content" ref = "ok">
                    {Object.keys(this.get_view()).map((k) =>
                        <div key={k} id={k} className={this.props.app.App.state.current_view == k ? "block" : "none"}>
                            {this.store_view[k]}
                        </div>)}
                </div>
            </div>
        )
    }
}


module.exports = {ViewManager: Pp(ViewManager), MainMenu: Pp(MainMenu), MenuItem: Pp(MenuItem),
    ControlPanel: Pp(ControlPanel), CPFilter: Pp(CPFilter), CPToolBar: Pp(CPToolBar), CPButton: Pp(CPButton),
    CPSearchView: Pp(CPSearchView), CPTitle: Pp(CPTitle),
    Application: Pp(Application), LeftBar: Pp(LeftBar), Container: Pp(Container), Pp: Pp}

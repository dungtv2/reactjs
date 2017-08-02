import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reactMixin from 'react-mixin'
import styles from './App.css';
import styleok from './ok.less';
import styleok1 from './lala.less';
import {createStore, applyMiddleware} from 'redux';
import classNames from 'classnames';
// import {Button} from 'react-bootstrap';
var U = require('react-addons-update');
var Q = require('q');
var R = require('ramda');
// var update = require('react-update');

const VIEW = {form: "form", tree: "tree"}


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
var store = createStore(MyReducer, defaultState, applyMiddleware(thunkMiddleware, loggerMiddleware));

class MenuItem extends Component {
    constructor(props){
        super(props);
        this.onClickMenu = this.onClickMenu.bind(this);
    }
    onClickMenu(item){
        if (item.isParent){
            this.app.MainMenu.onClickMenu(item);
            this.app.App.onClickMenu(item);
        }else{
            this.app.LeftBar.onClickMenu(item);
            this.app.Container.onClickMenu(item);
        }
        this.$el.addClass('active');
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

MenuItem = Pp(MenuItem);

// Main Menu menu
class MMMenu extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ul className="nav app-mm-menu">
                {Object.keys(this.app.App.menu).map((k) =>
                    <MenuItem app={this.app} key={k.toString()} item={this.app.App.menu[k]} />
                )}
            </ul>
        )
    }
}

MMMenu = Pp(MMMenu)

// Main Menu User
class MMUser extends Component {
    constructor(props){
        super(props);
    }
    render () {
        return (
            <ul className="nav app-mm-user">
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                        <img src="/static/src/icons/image.png" />
                        <span>GS Admin</span>
                        <b className="caret"></b>
                    </a>
                    <ul className="dropdown-menu">
                        <li><a data-menu="documentation" href="#">Documentation</a></li>
                        <li><a data-menu="support" href="#">Support</a></li>
                        <li><a data-menu="about" href="#">About</a></li>
                        <li className="divider"></li>
                        <li><a data-menu="settings" href="#">Preferences</a></li>
                        <li><a data-menu="logout" href="#">Log out</a></li>
                    </ul>
                </li>
            </ul>
        )
    }
}

MMUser = Pp(MMUser);

class MainMenu extends Component {
    constructor(props){
        super(props);
        this.onClickMenu = this.onClickMenu.bind(this);
    }
    onClickMenu(item){
        this.$el.find("li").removeClass("active");
    }
    render() {
        return (
            <nav id="nav-main">
                <div className="navbar-header"></div>
                <div className="navbar-collapse collapse">
                    <MMMenu app={this.app} />
                    <MMUser app={this.app} />
                </div>
            </nav>
        )
    }
}

MainMenu = Pp(MainMenu)

class Container extends Component {
    constructor(props) {
        super(props);
        this.onClickMenu = this.onClickMenu.bind(this);
    }
    onClickMenu(item) {
        // do something here
        this.app.App.changeState(U(this.app.App.state, {current_child_menu: {$set: item.model}, current_view: {$set: "tree"}}));
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

Container = Pp(Container)

class LeftBar extends Component {
    constructor(props) {
        super(props)
        this.onClickMenu = this.onClickMenu.bind(this);
    }
    onClickMenu(item){
        this.$el.find("li").removeClass("active");
    }
    render() {
        var menu_child = this.app.App.menu[this.app.App.state.current_nav_main].child;
        return (
            <div id="app-left">
                <a className="app-lb-logo" href="/web">
                    <img src="http://localhost:8666/web/binary/company_logo?db=baskin_v1&amp;company=1" />
                </a>
                <ul>
                    {Object.keys(menu_child).map((k) => <MenuItem key={k} item={menu_child[k]} app={this.app} />)}
                </ul>
            </div>
        )
    }
}

LeftBar = Pp(LeftBar)

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

Application = Pp(Application)

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

CPTitle = Pp(CPTitle)

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

CPSearchView = Pp(CPSearchView)

class MyButton extends Component {
    constructor(props){
        super(props);
        this.type = {default: "btn-default", primary: "btn-primary"}
    }
    onClickButton() {
        this.data.onClick();
    }
    __onBeforeRender() {
        this.data = this.props.data || {};
    }
    render() {
        return (
            <button className={classNames("mr-5 btn btn-sm", this.type[this.data.type || "default"])}
                    onClick={this.onClickButton.bind(this)}>{this.data.string || ""}</button>
        );
    }
}

MyButton = Pp(MyButton)

class CPButton extends Component {
    constructor(props){
        super(props);
    }
    __onAfterRender(){
        // do something not relation with state
        // this.$el.find(".app-buttons-create").css({display: "none"});
    }
    renderView(){
        var self = this;
        var data = {btn1: {}, btn2: {}};
        var App = this.app.App;
        switch (App.state.current_view){
            case VIEW.form:
                data = {btn1: {string: "Save"}, btn2: {string: "Discard"}};
                switch (App.state.form_type){
                    case App.form_type.view:
                        data.btn1.string = "Edit";
                        data.btn1.onClick = function () {
                            App.changeState(U(App.state, {form_type: {$set: App.form_type.edit}}));
                        }
                        data.btn2.string = "Create";
                        data.btn1.onClick = function () {
                            App.changeState(U(App.state, {form_type: {$set: App.form_type.create}}));
                        }
                        break;
                    case App.form_type.edit:
                        break;
                }
                break;
            case VIEW.tree:
                let onClickBtn1 = function () {
                    App.changeState(U(App.state, {current_view: {$set: "form"}, form_type: {$set: App.form_type.create}}));
                }
                let onClickBtn2 = function () {
                }
                data = {btn1: {string: "Create", type: "primary", onClick: onClickBtn1},
                        btn2: {string: "Import", onClick: onClickBtn2}};
                break;
        }
        return <span className={classNames("app-buttons-create")}>
                    <MyButton data={data.btn1} />
                    <MyButton data={data.btn2} />
               </span>
    }
    render() {
        return (
            <div className="">
                {this.renderView.bind(this)()}
            </div>
        );
    }
}

CPButton = Pp(CPButton)

class CPToolBarPager extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="app-cp-pager">
                <div className="app-cp-page-value">
                    <span>1-80 of 122</span>
                </div>
                <div className="btn-group btn-group-sm oe-pager-buttons">
                    <a type="button" title="" className="fa fa-chevron-left btn btn-default oe-pager-button" data-original-title="Tree"></a>
                    <a type="button" title="" className="fa fa-chevron-right btn btn-default oe-pager-button" data-original-title="Tree"></a>
                </div>
            </div>
        );
    }
}

CPToolBarPager = Pp(CPToolBarPager)

class CPToolBarSwitchButton extends Component {
    constructor(props) {
        super(props);
    }
    __onBeforeRender(){
        this.current_view = this.props.app.App.state.current_view;
    }
    render(){
        return (
            <div className="app-cp-switch-buttons btn-group btn-group-sm">
                <button type="button" onClick={() => this.props.app.Application.change_view_manager("tree")} title=""
                        className={classNames("btn btn-default fa fa-list-ul oe-cp-switch-list", this.current_view === "tree" ? "active" : "")}
                        data-original-title="Tree"></button>
                <button type="button" onClick={() => this.props.app.Application.change_view_manager("kanban")} title=""
                        className={classNames("btn btn-default fa fa-th-large oe-cp-switch-kanban", this.current_view === "kanban" ? "active" : "")}
                        data-original-title="Kanban"></button>
                <button type="button" onClick={() => this.props.app.Application.change_view_manager("form")} title=""
                        className={classNames("btn btn-default fa fa-edit oe-cp-switch-form", this.current_view === "form" ? "active" : "")}
                        data-original-title="Form"></button>
            </div>
        );
    }
}

CPToolBarSwitchButton = Pp(CPToolBarSwitchButton)

class CPToolBar extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="app-toolbar">
                <CPToolBarPager app={this.app} />
                <CPToolBarSwitchButton app={this.app} />
            </div>
        );
    }
}

CPToolBar = Pp(CPToolBar)

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

CPFilter = Pp(CPFilter)

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
                            <CPButton app={this.app} />
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

ControlPanel = Pp(ControlPanel)

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

ViewManager = Pp(ViewManager)

module.exports = {ViewManager: ViewManager,
    ControlPanel: ControlPanel, CPFilter: CPFilter, CPToolBar: CPToolBar, CPButton: CPButton, MainMenu: MainMenu,
    CPToolBarPager: CPToolBarPager, CPToolBarSwitchButton: CPToolBarSwitchButton, MenuItem: MenuItem,
    CPSearchView: CPSearchView, CPTitle: CPTitle,
    Application: Application, LeftBar: LeftBar, Container: Container, Pp: Pp}




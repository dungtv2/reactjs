import React, { Component } from 'react';
const U = require('react-addons-update');

import { Pp } from './../Base/BaseComponent.js';
import { ControlPanel } from './../Component/'
import classNames from 'classnames';

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
        // store.dispatch(Action.fetchPosts({url: '/list/1'})).then(function () {
        //     let new_state = store.getState();
        // });
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
module.exports = {ControlPanel: Pp(ControlPanel)}
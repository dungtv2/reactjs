import React, { Component } from 'react';
import { Pp } from './Base.js';
import {  } from './MenuItem.js'
import classNames from 'classnames';


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

module.exports = {ViewManager: Pp(ViewManager)}
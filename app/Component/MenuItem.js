import React, { Component } from 'react';
import { Pp } from './Base.js';
import classNames from 'classnames';


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

module.exports = {MenuItem: Pp(MenuItem)}
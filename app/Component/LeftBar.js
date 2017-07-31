import React, { Component } from 'react';
import { Pp } from './Base.js';
import { MenuItem } from './MenuItem.js'
import classNames from 'classnames';


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
                <ul>
                    {Object.keys(menu_child).map((k) => <MenuItem key={k} item={menu_child[k]} app={this.app} />)}
                </ul>
            </div>
        )
    }
}

module.exports = {LeftBar: Pp(LeftBar)}
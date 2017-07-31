import React, { Component } from 'react';
import { Pp } from './Base.js';
import classNames from 'classnames';


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

module.exports = {MenuItem: Pp(MenuItem)}
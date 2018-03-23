import React, { Component, PropTypes } from 'react';
import { Register} from '../Base.js';


class MenuItem extends Component {
    static propTypes = {
        name: PropTypes.string,
        active: PropTypes.bool,
        label: PropTypes.string,
        onClickItem: PropTypes.func
    }
    static defaultProps = {
        name: "na",
        active: false,
        label: "N/A",
        onClickItem: () => {}
    }
    constructor (props) {
        super (props);

    }
    onClick = (e) => {
        if (!this.props.active){
            this.props.onClickItem();
        }
    }
    render () {
        const {name, active, label} = this.props;
        return (
            <li onClick={this.onClick} name={name}>
                <a className={active}>{label}</a>
            </li>
        )
    }
}

@Register
class Menu extends Component {
    static propTypes = {
        menus: PropTypes.object,
        curItem: PropTypes.string,
    }
    static defaultProps = {
        menus: {redux: {label: "Redux", name: "redux"}, pure: {label: "Pure", name: "pure"}},
        curItem: "redux",
    }
    constructor (props) {
        super(props);
        const {menus, curItem, prevItem} = props;
        this.prevItem = null;
        this.state = {curItem: curItem};
    }
    verifyItemName = (itemName) => {
        if (!this.menus.hasOwnProperty(itemName)){
            alert(`Item Name ${itemName} not in Menu, pls check again`);
            return false;
        }
        return true;
    }
    __setPrevItem = () => {
        this.prevItem = this.state.curItem;
    }
    onClickItem = (itemName) => {
        this.__setPrevItem();
        this.setState({curItem: itemName});
        this.setStoreState("MainContainer", "curItem", itemName);
    }
    render () {
        const { menus } = this.props;
        const menuItem = Object.keys(menus).map((k) =>
            <MenuItem key={k}
                      active={k == this.state.curItem ? "active": ""}
                      {...menus[k]}
                      onClickItem={() => this.onClickItem(k)} />
        );
        return (
            <ul className="su_header_nav">
                {menuItem}
            </ul>
        )
    }
}

module.exports = {Menu: Menu, MenuItem: MenuItem}

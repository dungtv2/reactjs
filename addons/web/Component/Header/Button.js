import React, { Component, PropTypes } from 'react';
// import {Wrapper} from '../../../base/components';
import Wrapper from "../../../base/components/Wrapper";

@Wrapper.Register
class BtnGroup extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div className="su--header_button">
                {this.props.children}
            </div>
        )
    }
}


@Wrapper.Register
export default class Button extends Component {
    static propTypes = {
        string: PropTypes.string,
        name: PropTypes.string,
        onClick: PropTypes.func,
        type: PropTypes.string,
        fontWeight: PropTypes.bool
    }
    static defaultProps = {
        string: "Button",
        name: "btn",
        onClick: () => {alert("clicked!.")},
        type: "primary",
        fontWeight: true
    }
    constructor (props) {
        super(props);
    }
    onClick = () => {
        this.props.onClick();
    }
    render () {
        const { string, name, type, fontWeight } = this.props;
        return (
            <button name={name} onClick={this.onClick} className={`btn btn-${type}`}>
                {fontWeight
                    ? <strong>{string}</strong>
                    : {string}
                }
            </button>
        )
    }
}


module.exports = {Button: Button, BtnGroup: BtnGroup}

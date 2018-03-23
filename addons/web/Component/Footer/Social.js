import React, { Component, PropTypes } from "react";
import Wrapper from "../../../base/components/Wrapper";


class GroupSocial extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    }
    static defaultProps = {
        children: null,
    }
    render () {
        return (
            <div className="su--social_links pull-right">
                {this.props.children}
            </div>
        )
    }
}

@Wrapper.Register
export default class SocialComponent extends Component {
    static propTypes = {
        icon: PropTypes.string,
        onClick: PropTypes.func
    }
    static defaultProps = {
        icon: "facebook",
        onClick: () => {alert("Clicked!")}
    }
    constructor(props){
        super(props);
    }
    onClick = (e) => {
        this.props.onClick()
    }
    render() {
        const { icon } = this.props;
        return (
            <a onClick={this.onClick}>
                <i className={`fa fa-${icon}`}></i>
            </a>
        )
    }
}


module.exports = {GroupSocial: GroupSocial, SocialComponent: SocialComponent}

import React, { Component} from "react";
import PropTypes from 'prop-types';
import Wrapper from "../../../base/components/Wrapper";


@Wrapper.Register
export default class Link extends Component {
    static propTypes = {
        href: PropTypes.string,
        string: PropTypes.string,
        title: PropTypes.string,
    }
    static defaultProps = {
        href: "/page/website-builder",
        string: "Website made with",
        title: "ReactJS",
    }
    constructor (props) {
        super(props);
    }
    render () {
        const { href, string, title } = this.props;
        return (
            <a className="small" href={href}>
                {string} <span className="">{title}</span>
            </a>
        )
    }
}
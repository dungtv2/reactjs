import React, { Component } from "react";
import PropTypes from 'prop-types';
import TitlesStyle from "./Titles.less";


export default class Title extends Component {
    static propTypes = {
        title: PropTypes.string,
        onClick: PropTypes.func,
        borderColor: PropTypes.string,
        borderSize: PropTypes.number,
        borderType: PropTypes.string,
    }
    static defaultProps = {
        title: "N/A",
        onClick: () => {alert("title")},
        borderColor: "orange",
        borderSize: 8,
        borderType: "solid",
    }
    constructor (props) {
        super (props);
    }
    onClick = () => {
        this.props.onClick();
    }
    render () {
        const {borderColor, borderSize, borderType, title} = this.props;
        return (
            <div className="title_group" style={{borderTop: `3px solid ${borderColor}`}}>
                <a style={{borderLeft: `${borderSize}px ${borderType} ${borderColor}`}}
                   onClick={this.onClick}>{title}</a>
            </div>
        )
    }
}



import React, { Component, PropTypes } from "react";
import TitlesStyle from "./Titles.less";


export default class Title extends Component {
    static propTypes = {
        title: PropTypes.string,
        onClick: PropTypes.func,
        borderColor: PropTypes.string,
        borderSize: PropTypes.int,
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
            <div className="title_group" >
                <a style={{borderLeft: `${borderSize}px ${borderType} ${borderColor}`}}
                   onClick={this.onClick}>{title}</a>
            </div>
        )
    }
}



import React, { Component } from "react";
import PropTypes from 'prop-types';
import TitlesStyle from "./Titles.less";


export default class Detail extends Component {
    static propTypes = {
        title: PropTypes.string,
        body: PropTypes.string,
        description: PropTypes.html,
    }
    static defaultProps = {
        title: "N/A",
        body: "orange",
        description: "description",
    }
    constructor (props) {
        super (props);
    }
    onClick = () => {
        this.props.onClick();
    }
    render () {
        const {title, body, description} = this.props;
        return (
            <div className="art_document" >
                <div className="art_header">
                    <h1>{title}</h1>
                </div>
                <div className="art_content">
                    {description}
                    <br />
                    <div dangerouslySetInnerHTML={{__html: body}} />
                </div>
                <div className="art_footer"></div>
            </div>
        )
    }
}



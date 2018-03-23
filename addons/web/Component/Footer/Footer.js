import React, { Component } from "react";
import Wrapper from "../../../base/components/Wrapper";
import Link from "./Link";
import {GroupSocial, SocialComponent} from "./Social";


@Wrapper.Register
export default class Footer extends Component {
    constructor(props) {
        super(props);
    }
    renderHeader = () => {
        const html = <div className="su--footer-main container">
            <span className="su--footer_logo center-block">ReactJS</span>
            <div className="row"></div>
        </div>;
        return html;
    }
    renderFooter = () => {
        const html = <div className="su--footer-footer">
            <div className="container">
                <Link />
                <GroupSocial>
                    <SocialComponent icon={"facebook"} />
                    <SocialComponent icon={"twitter"} />
                    <SocialComponent icon={"linkedin"} />
                    <SocialComponent icon={"envelope"} />
                </GroupSocial>
            </div>
        </div>;
        return html;
    }
    render() {
        return (
            <footer>
                {this.renderHeader()}
                {this.renderFooter()}
            </footer>
        )
    }
}

// module.exports = {Footer: Footer}

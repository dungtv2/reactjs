import React from "react";
import {Button, BtnGroup} from "./Button";
import Logo from "./Logo";
import {Menu, MenuItem} from "./Menu";
import SearchView from "./SearchView";
import Wrapper from "../../../base/components/Wrapper";


@Wrapper.Register
export default class Header extends React.Component {
    constructor (props) {
        super(props);
    }
    renderHeader() {
        const html = <div className="su_header_main header">
            <Logo label={"ReactJS"} />
            <Menu />
        </div>
        return html;
    }
    renderMain () {
        return null
    }
    onClickBtnSearch = (data) => {
        this.setStoreState("MainContainer", "curItem", "search_result");
    }
    onChangeSearch = (data) => {
        this.setStoreState("MainContainer", "curItem", "search_result");
    }
    renderFooter() {
        const html = <div className="su_header_search">
            <div className="container">
                <div className="row">
                    <div className="col-xs-7 col-md-3 col-sm-4
                                                col-lg-2 su--nav_btn_group">
                    </div>
                    <div className="col-xs-5 col-sm-2 col-md-3 col-sm-push-6
                                                col-lg-push-7 text-right su--nav_btn_group">
                    </div>
                    <div className="clearfix visible-xs-block"></div>
                    <div className="col-sm-6 col-md-6 col-sm-pull-2 col-md-pull-3
                                                col-lg-offset-1 su--search-container">
                        <SearchView onChange={this.onChangeSearch}
                                    onClick={this.onClickBtnSearch} />
                    </div>
                </div>
            </div>
        </div>
        return html;
    }
    render() {
        return (
            <header>
                {this.renderHeader()}
                {this.renderMain()}
                {this.renderFooter()}
            </header>
        )
    }
}


// module.exports = {Header: Header}

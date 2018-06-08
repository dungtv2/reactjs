import React from "react";
import {Button, BtnGroup} from "./Button";
import Logo from "./Logo";
import {Menu, MenuItem} from "./Menu";
import SearchView from "./SearchView";
import Wrapper from "../../../base/components/Wrapper";
import HeaderStyle from "./Header.less";


@Wrapper.Register
export default class Header extends React.Component {
    constructor (props) {
        super(props);
    }
    render() {
        return (
            <div class="header">
                <div className="container" style={{display: "flex"}}>
                    <div className="left" style={{flex: 1}}>
                        <a>
                            <img src="https://www.tutorialspoint.com/python/images/logo.png" />
                        </a>
                    </div>
                    <div className="right">
                        <div className="top" style={{display: "inline-block", width: "100%"}}>
                            <ul className="nav nav-pills nav-top" style={{float: "left"}}>
                                <li><a href="/about/about_careers.htm" style={{background: "#fffb09", fontWeight: "bold"}}><i className="fa fa-suitcase"></i> Jobs</a></li>
                                <li> <a target="_blank" href="/programming_examples/"><i className="fa fa-cubes"></i> &nbsp;Examples</a> </li>
                                <li> <a href="https://www.tutorialspoint.com/netmeeting.php"><i className="fa fa-camera"></i> &nbsp;Net Meeting</a> </li>
                                <li> <a href="/online_dev_tools.htm"> <i class="dev-tools-menu" style={{opacity: ".5"}}></i> Tools </a> </li>
                                <li> <a href="/articles/index.php"><i class="fa icon icon-file-text-o"></i> &nbsp;Articles</a> </li>
                            </ul>
                            <ul class="social-icons" style={{float: "right"}}>
                                <li className="facebook"><a href="https://www.facebook.com/tutorialspointindia" target="_blank" data-placement="bottom" title="tutorialspoint @ Facebook"></a></li>
                                <li className="googleplus"><a href="https://plus.google.com/u/0/116678774017490391259/posts" target="_blank" data-placement="bottom" title="tutorialspoint @ Google+"></a></li>
                                <li className="twitter"><a href="https://www.twitter.com/tutorialspoint" target="_blank" data-placement="bottom" title="tutorialspoint @ Twitter"></a></li>
                                <li className="linkedin"><a href="https://www.linkedin.com/company/tutorialspoint" target="_blank" data-placement="bottom" title="tutorialspoint @ Linkedin"></a></li>
                                <li className="youtube"><a href="https://www.youtube.com/channel/UCVLbzhxVTiTLiVKeGV7WEBg" target="_blank" data-placement="bottom" title="tutorialspoint YouTube"></a></li>
                            </ul>
                        </div>
                        <div className="bottom">
                            <nav className="nav-main">
                                <ul className="nav nav-pills">
                                    <li><a className="active"><i class="fa fa-home"></i>Home</a></li>
                                    <li><a><i className="fa fa-send"></i> ShowBiz </a> </li>
                                    <li><a><span className="tut-lib"> Phiếm </span></a></li>
                                    <li><a><i className="fa fa-toggle-right"></i> Videos </a></li>
                                    <li><a><i className="fa fa-user"> </i> Âm Nhạc</a></li>
                                    <li><a><i className="fa fa-code"></i> Cười </a> </li>
                                    <li><a><i className="fa fa-usd"></i> Thả Ga </a> </li>
                                    <li>
                                        <a className="more">
                                            <i className="fa fa-bars" style={{color: "#bb97d0"}}></i>
                                        </a>
                                    </li>
                                    <li>
                                        <div className="header-search-box">
                                            <input type="text" placeholder="Tìm gì bạn thích..." autocomplete="off" />
                                            <a><i class="fa fa-search"></i> Search </a>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


// @Wrapper.Register
// export default class Header extends React.Component {
//     constructor (props) {
//         super(props);
//     }
//     renderHeader() {
//         const html = <div className="su_header_main header">
//             {/*<Logo label={"ReactJS"} />*/}
//             {/*<Menu />*/}
//         </div>
//         return html;
//     }
//     renderMain () {
//         return null
//     }
//     onClickBtnSearch = (data) => {
//         this.setStoreState("MainContainer", "curItem", "search_result");
//     }
//     onChangeSearch = (data) => {
//         this.setStoreState("MainContainer", "curItem", "search_result");
//     }
//     renderFooter() {
//         const html = <div className="su_header_search">
//             <div className="container">
//                 <div className="row" style={{display: "flex"}}>
//                     <div className="logo" style={{width: "20%"}}>
//                         <a style={{color: "white", fontSize: "24px", fontWeight: "bold"}}>Oodoo</a>
//                     </div>
//                     <div className="su--search-container">
//                         <SearchView onChange={this.onChangeSearch}
//                                     onClick={this.onClickBtnSearch} />
//                     </div>
//                     {/*<div className="su--nav_btn_group">*/}
//                         {/*<a style={{position: "relative", overflow: "hidden", color: "white", fontWeight: "bold"}}>*/}
//                             {/*<i className="fa fa-cube" /> APPS*/}
//                         {/*</a>*/}
//                     {/*</div>*/}
//                 </div>
//             </div>
//         </div>
//         return html;
//     }
//     render() {
//         return (
//             <header>
//                 {this.renderHeader()}
//                 {this.renderMain()}
//                 {this.renderFooter()}
//                 <nav style={{backgroundColor: "white", height: "40px", border: "1px solid rgba(0, 0, 0, 0.05)"}}>
//                     <div className="container">
//                         <ul>
//                             <li>
//                                 <a><i class="fa fa-home"></i></a>
//                             </li>
//                             <li><a>Fashion</a></li>
//                             <li><a>Gym</a></li>
//                             <li><a>Showbiz</a></li>
//                             <li><a>Video</a></li>
//                             <li><a>Ăn Học</a></li>
//                         </ul>
//                     </div>
//                 </nav>
//             </header>
//         )
//     }
// }


// module.exports = {Header: Header}

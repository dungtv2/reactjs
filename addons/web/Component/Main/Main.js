import React, { Component } from "react";
import PropTypes from 'prop-types';
import Wrapper from "../../../base/components/Wrapper";
import {Article, WrapArtOM, WrapArtLine, WrapArtSingle} from "./Article";
import Detail from "./Details";
import Title from "./Titles";
import HomeStyle from "./Home.less";
// import Article from "./Article";
var Q = require('q');

const AbcContext = React.createContext("abc");

import ReactDOM from 'react-dom';

const CIRCLE_SIZE = 85;

// class DragBox extends React.Component {
//     state = {
//         hasCapture: false,
//         position: 0,
//         page: 1,
//         numberPage: 0,
//     };
//     isDragging = false;
//     previousLeft = 0;
//     previousTop = 0;
//     constructor (props) {
//         super(props);
//         this.size = 9;
//         this.myUl = React.createRef();
//         this.myContainer = React.createRef();
//         this.item = React.createRef();
//     }
//     onDown = event => {
//         this.isDragging = true;
//         event.target.setPointerCapture(event.pointerId);
//         // We store the initial coordinates to be able to calculate the changes
//         // later on.
//         this.extractPositionDelta(event);
//     };
//     componentDidMount () {
//         var { number_page } = this.prepareArg();
//         this.setState({numberPage: number_page});
//     }
//     prepareArg = () => {
//         const size = 9;
//         const con_width = this.myContainer.current.offsetWidth;
//         const item_width = this.item.current.offsetWidth;
//         const items_size = Math.abs(parseInt(con_width/item_width)); // items in per page
//         const items_width = items_size*item_width; // items width in per page
//         const max_width = ((size*item_width-con_width) + (size - 1)*2)*-1;
//         var number_page = parseInt(size/items_size);
//         if (size%items_size > 0) {
//             number_page += 1;
//         }
//         return {number_page: number_page, con_width: con_width, item_width: item_width,
//                 items_size: items_size, items_width: items_width, max_width: max_width}
//     }
//     onDotSlide = (page) => {
//         let { items_size, items_width, max_width } = this.prepareArg();
//         let position = ((page - 1)*items_width + (page - 1)*items_size*2)*-1;
//         if (position > 0) {
//             position = 0;
//         }
//         if (position < max_width) {
//             position = max_width;
//         }
//         this.setState({page: page, position: position});
//     }
//     onBtnSlide = (type="next") => {
//         var {number_page, items_size, items_width, max_width} = this.prepareArg();
//         var {page, position} = this.state;
//         if (type == "next" && page < number_page) {
//             page += 1;
//             position += -(items_width + items_size * 2);
//         }else if (type == "prev" && page > 1) {
//             page -= 1;
//             position -= -(items_width + items_size * 2);
//         }
//         if (position > 0) {
//             position = 0;
//         }
//         if (position < max_width) {
//             position = max_width;
//         }
//         this.setState({page: page, position: position});
//     }
//     onMoveSlide = () => {
//         var { position } = this.state;
//         var { items_size, items_width, max_width } = this.prepareArg();
//         var page = 1;
//         if (position > 0) {
//             position = 0;
//         }else{
//             var page_size = Math.abs(parseInt(position/items_width));
//             var surplus_width = Math.abs(position%items_width);
//             var position = (page_size * items_width + page_size*items_size*2) * -1;
//             if (surplus_width > items_width/2) {
//                 position += -items_width - items_size*2;
//             }
//             if (position < max_width) {
//                 position = max_width;
//             }
//             page = Math.abs(parseInt(position/items_width)) + 1;
//             surplus_width = Math.abs(position%items_width);
//             if (surplus_width > items_width/2) {
//                 page += 1;
//             }
//         }
//         this.setState({hasCapture: false, position: position, page: page});
//     }
//     onMove = event => {
//         if (!this.isDragging) {
//             return;
//         }
//         const {left, top} = this.extractPositionDelta(event);
//         this.setState(({position}) => ({
//             position: position + left,
//         }));
//     };
//
//     onUp = event => {
//         this.isDragging = false;
//     };
//     onGotCapture = event => {
//         this.setState({hasCapture: true});
//     };
//     onLostCapture = event =>{
//         this.onMoveSlide();
//     }
//     extractPositionDelta = event => {
//         const left = event.pageX;
//         const top = event.pageY;
//         const delta = {
//             left: left - this.previousLeft,
//             top: top - this.previousTop,
//         };
//         this.previousLeft = left;
//         this.previousTop = top;
//         return delta;
//     };
//
//     render() {
//         const {hasCapture, position } = this.state;
//
//         const boxStyle = {
//             border: '1px solid #d9d9d9',
//             margin: '10px 0 20px',
//             width: '100%',
//             position: 'relative',
//         };
//
//         const circleStyle = {
//             width: CIRCLE_SIZE,
//             height: CIRCLE_SIZE,
//             borderRadius: CIRCLE_SIZE / 2,
//             marginLeft: position,
//             backgroundColor: hasCapture ? 'blue' : 'green',
//             touchAction: 'none',
//         };
//         const style_ok = {width: "100%", border: "1px solid black", position: "relative", overflow: "hidden", touchAction: 'none',}
//         const style_1 = { listStyle: "none", padding: "0px", margin: "0px", display: "flex", marginLeft: position, touchAction: 'none', transition: ".3s ease-in-out", cursor: "pointer"}
//         const li_style = {width: "250px", marginRight:"2px", border: "1px solid green", height: "100px", float: "left", background: "#cdcdcd", flexShrink: 0, touchAction: 'none',}
//         return (
//             <div style={boxStyle}>
//                 <div style={style_ok} ref={this.myContainer}>
//                     <ul style={style_1} ref={this.myUl}
//                         onPointerDown={this.onDown}
//                         onPointerMove={this.onMove}
//                         onPointerUp={this.onUp}
//                         onPointerCancel={this.onUp}
//                         onGotPointerCapture={this.onGotCapture}
//                         onLostPointerCapture={this.onLostCapture}
//                     >
//                         <li style={li_style} ref={this.item}>1</li>
//                         <li style={li_style}>2</li>
//                         <li style={li_style}>3</li>
//                         <li style={li_style}>4</li>
//                         <li style={li_style}>5</li>
//                         <li style={li_style}>6</li>
//                         <li style={li_style}>7</li>
//                         <li style={li_style}>8</li>
//                         <li style={li_style}>9</li>
//                     </ul>
//                     <div className="art_slide">
//                         {Array.from(Array(this.state.numberPage).keys()).map((d, k) =>
//                             <span key={k} className={this.state.page == d+1 ? "active": ""} onClick={() => this.onDotSlide(d+1)}></span>)}
//                     </div>
//                     <div className="wrap_prev" style={{position: "absolute", left: "0px", top: "30px"}}>
//                         <i onClick={() => this.onBtnSlide("prev")} style={{display: "block", background: "pink", color: "white"}}>Prev</i>
//                     </div>
//                     <div className="wrap_next" style={{position: "absolute", right: "0px", top: "30px"}}>
//                         <i onClick={() => this.onBtnSlide("next")} style={{display: "block", background: "pink", color: "white"}}>Next</i>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

@Wrapper.Register
class HomeContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {data: [], top: [], top1: [], data1: [], data6: []}
    }
    componentWillMount () {
        var self = this;
        Loader.$http().get("/search/tv_news/[]").then(function (result) {
            result = eval(result)
            var top = Object.create(result);
            var top1 = Object.create(result);
            var data1 = Object.create(result);
            var data6 = Object.create(result);
            self.setState({data: result, top: top.splice(0, 3), top1: top1.splice(3, 3),
                data1: data1.splice(4, 4), data6: data6.splice(0, 6)});
        });
    }
    render () {
        const onClick = (article) => this.props.onClick("detail", article);
        const { data, top, top1, data1, data6 } = this.state;
        if (data.length == 0) {
            return (null);
        }
        return (
            <div className="wrap_container">
                <div className="wrap_left">
                    {/*<AbcContext.Consumer>*/}
                        {/*{abc => <h1>{abc}</h1>}*/}
                    {/*</AbcContext.Consumer>*/}
                    <WrapArtSingle onClick={onClick} type={5} articles={data} hot={[1]} slide={true} fB={"rgba(187, 151, 208, 0.2)"} rB={"#F9F9F9"} />
                    <div className={"box_singles"} style={{display: "flex"}}>
                        <WrapArtSingle onClick={onClick} slide={true} rB={"rgba(217, 182, 236, 0.3)"} articles={top} />
                        <WrapArtSingle onClick={onClick} slide={true} rB={"rgba(236, 193, 182, 0.3)"} articles={top1} />
                    </div>
                    <div style={{maxHeight: "200px", overflow: "hidden"}}>
                        <div style={{width: "2000px", float: "left"}}>
                            {data.map((d, k) => <Article style={{width: "300px", float: "left"}} key={k} {...d} />)}
                        </div>
                    </div>
                    <WrapArtSingle onClick={onClick} type={2} rB={"#F9F9F9"} B={"none"} fB={"rgba(224, 192, 209, 0.3)"} articles={data1} size={4} />
                    <WrapArtSingle onClick={onClick} type={4} articles={data} linesDirection={"row"} fB={"rgba(181, 207, 230, 0.3)"} size={4} rB={"#F9F9F9"} />
                    <Title title={"Ăn Chơi"} borderColor={"orange"} />
                    <WrapArtLine onClick={onClick} articles={data6} size={3} subString={true} description={false} />
                    <Title title={"Khoa Học"} borderColor={"pink"} />
                    <WrapArtLine onClick={onClick} articles={data} size={1} artDirection={"row"} />
                </div>
                <div className="wrap_right">
                    {/*<Article {...data[1]} position={"absolute"} />*/}
                </div>
            </div>
        )
    }
}

@Wrapper.Register
class DetailContainer extends Component {
    render () {
        var article_line_1 = [
            {img: "/assets/img/b2.jpg",title: "Chiêu trò mang tên suất chiếu sớm: Muốn thắng, phải biết tung đòn!", description: "Suất chiếu sớm (sneak-show) là một chiến lược trong khâu quảng bá và phát hành của một phim điện ảnh, nhưng không phải ..."},
            {img: "/assets/img/b1.gif",title: "Bật mí hậu trường “Liệt Hỏa Như Ca”: Địch Lệ Nhiệt Ba là nữ thần hay Thánh lầy hạng A", description: "Suất chiếu sớm (sneak-show) là một chiến lược trong khâu quảng bá và phát hành của một phim điện ảnh, nhưng không phải ..."},
            {img: "/assets/img/a3.jpg",title: "Chiêu trò mang tên suất chiếu sớm: Muốn thắng, phải biết tung đòn!", description: "Suất chiếu sớm (sneak-show) là một chiến lược trong khâu quảng bá và phát hành của một phim điện ảnh, nhưng không phải ..."}
        ];
        const article = this.getDataStore("Article", {});
        const onClick = (article) => this.props.onClick("detail", article);
        return (
            <div className="wrap_container">
                <div className="wrap_left">
                    <Detail {...article} />
                    <WrapArtLine onClick={onClick} articles={article_line_1} />
                </div>
                <div className="wrap_right">
                </div>
            </div>
        )
    }
}

@Wrapper.Register
class CategoryContainer extends Component {
    constructor (props, context) {
        super(props, context)
    }
    loadMore = () => {

    }
    onScroll = () => {
        var self = this;
        window.addEventListener('scroll', function(e) {
            alert("a")
        });
        window.scroll(function () {
           alert("abc")
        });
        // $(window).scroll(function() {
        //     if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
        //         $(window).scrollTop($(window).scrollTop() - 300);
        //     }
        // });
    }
    render () {
        this.onScroll();
        var data = [
            {img: "/assets/img/nhidin-1520529815_300x180.png", title: "Yoona bị nữ thần và sao nhí vượt mặt không tin bạn cứ nhìn hai người đẹp"},
            {img: "/assets/img/b2.jpg", title: "Toàn cảnh chiến dịch #MeToo: Khi một hashtag phanh phui yêu râu xanh có sức mạnh lay chuyển cả Hàn Quốc"},
            {img: "/assets/img/b1.gif", title: "Toàn cảnh chiến dịch #MeToo: Khi một hashtag phanh phui yêu râu xanh có sức mạnh lay chuyển cả Hàn Quốc"},
            {img: "/assets/img/a3.jpg", title: "Toàn cảnh chiến dịch #MeToo: Khi một hashtag phanh phui yêu râu xanh có sức mạnh lay chuyển cả Hàn Quốc"},
            {img: "/assets/img/a1.png", title: "Toàn cảnh chiến dịch #MeToo: Khi một hashtag phanh phui yêu râu xanh có sức mạnh lay chuyển cả Hàn Quốc"},
            {img: "/assets/img/a2.jpg", title: "Một chiếc váy hai số phận, không tin bạn cứ nhìn hai người đẹp tên Hương Giang này là ..."}
        ]
        var articles_2line1 = [
            {img: "/assets/img/nhidin-1520529815_300x180.png", title: "Yoona bị nữ thần và sao nhí vượt mặt không tin bạn cứ nhìn hai người đẹp"},
            {img: "/assets/img/b2.jpg", title: "Toàn cảnh chiến dịch #MeToo: Khi một hashtag phanh phui yêu râu xanh có sức mạnh lay chuyển cả Hàn Quốc"},
            {img: "/assets/img/b1.gif", title: "Toàn cảnh chiến dịch #MeToo: Khi một hashtag phanh phui yêu râu xanh có sức mạnh lay chuyển cả Hàn Quốc"},
            {img: "/assets/img/a3.jpg", title: "Toàn cảnh chiến dịch #MeToo: Khi một hashtag phanh phui yêu râu xanh có sức mạnh lay chuyển cả Hàn Quốc"},
            {img: "/assets/img/a1.png", title: "Toàn cảnh chiến dịch #MeToo: Khi một hashtag phanh phui yêu râu xanh có sức mạnh lay chuyển cả Hàn Quốc"},
            {img: "/assets/img/a2.jpg", title: "Một chiếc váy hai số phận, không tin bạn cứ nhìn hai người đẹp tên Hương Giang này là ..."}];

        var articles_2line = [
            {img: "/assets/img/nhidin-1520529815_300x180.png", title: "Yoona bị nữ thần và sao nhí vượt mặt không tin bạn cứ nhìn hai người đẹp", description: "Suất chiếu sớm (sneak-show) là một chiến lược trong khâu quảng bá và phát hành của một phim điện ảnh, nhưng không phải ..."},
            {img: "/assets/img/a3.jpg", title: "Toàn cảnh chiến dịch #MeToo: Khi một hashtag phanh phui yêu râu xanh có sức mạnh lay chuyển cả Hàn Quốc", description: "Suất chiếu sớm (sneak-show) là một chiến lược trong khâu quảng bá và phát hành của một phim điện ảnh, nhưng không phải ..."},
            {img: "/assets/img/a1.png", title: "Sự kiện hội tụ binh đoàn sao hạng A siêu hot: Yoona bị nữ thần và sao nhí vượt mặt", description: "Suất chiếu sớm (sneak-show) là một chiến lược trong khâu quảng bá và phát hành của một phim điện ảnh, nhưng không phải ..."},
            {img: "/assets/img/a1.png", title: "Sự kiện hội tụ binh đoàn sao hạng A siêu hot: Yoona bị nữ thần và sao nhí vượt mặt", description: "Suất chiếu sớm (sneak-show) là một chiến lược trong khâu quảng bá và phát hành của một phim điện ảnh, nhưng không phải ..."},
            {img: "/assets/img/a1.png", title: "Sự kiện hội tụ binh đoàn sao hạng A siêu hot: Yoona bị nữ thần và sao nhí vượt mặt", description: "Suất chiếu sớm (sneak-show) là một chiến lược trong khâu quảng bá và phát hành của một phim điện ảnh, nhưng không phải ..."},
            {img: "/assets/img/a2.jpg", title: "Một chiếc váy hai số phận, không tin bạn cứ nhìn hai người đẹp tên Hương Giang này là ...", description: "Suất chiếu sớm (sneak-show) là một chiến lược trong khâu quảng bá và phát hành của một phim điện ảnh, nhưng không phải ..."}];
        const onClick = (article) => this.props.onClick("detail", article);
        const WrapTop = () => <WrapArtLine articles={articles_2line1} onClick={onClick} size={3} />;
        return (
            <div className="wrap_container">
                <div className="wrap_left">
                    {WrapTop}
                    <Title borderColor={"orange"} />
                    <WrapArtLine articles={articles_2line}
                                 onClick={onClick} size={1}
                                 artDirection={"row"} />
                </div>
                <div className="wrap_right">
                </div>
            </div>
        )
    }
}

var Loader = {
    call: function (method) {
        var url = "/"
        return function () {
            return core.ajax('GET', url, args);
        }
    },
    $http: function () {

        // A small example of object
        var core = {

            // Method that performs the ajax request
            ajax: function (method, url, args) {

                // Creating a promise
                var promise = new Promise(function (resolve, reject) {

                    // Instantiates the XMLHttpRequest
                    var client = new XMLHttpRequest();
                    var uri = url;

                    client.open(method, uri);
                    client.send();

                    client.onload = function () {
                        if (this.status >= 200 && this.status < 300) {
                            // Performs the function "resolve" when this.status is equal to 2xx
                            resolve(this.response);
                        } else {
                            // Performs the function "reject" when this.status is different than 2xx
                            reject(this.statusText);
                        }
                    };
                    client.onerror = function () {
                        reject(this.statusText);
                    };
                });

                // Return the promise
                return promise;
            }
        };

        // Adapter pattern
        return {
            get: function (url, args) {
                return core.ajax('GET', url, args);
            },
            post: function (args) {
                return core.ajax('POST', url, args);
            },
            put: function (args) {
                return core.ajax('PUT', url, args);
            },
            delete: function (args) {
                return core.ajax('DELETE', url, args);
            }
        };
    }
}

var ArticleModel = {

    search: function (domain) {

    },
    create: function () {

    },
    write: function () {

    },
    getAll: function () {

    }
}

@Wrapper.Register
export default class Main extends Component {
    constructor (props) {
        super(props);
        this.state = {container: "home"};
        this.form = {home: <HomeContainer onClick={this.switchContainer} />,
                     detail: <DetailContainer onClick={this.switchContainer} />,
                     category: <CategoryContainer onClick={this.switchContainer} />
        };
    }

    switchContainer = (container, article={}) => {
        if (article) {
            this.setDataStore("Article", article);
        }
        this.setState({container: container});
    }
    render () {
        return (
            <main>
                <div className="wrap_main container">
                    <AbcContext.Provider value="lala">
                    {this.form[this.state.container]}
                    </AbcContext.Provider>
                </div>
            </main>
        )
    }
}

import React, { Component, PropTypes } from "react";
import Wrapper from "../../../base/components/Wrapper";
import {WrapArtOM, WrapArtLine} from "./Article";
import Detail from "./Details";
import Title from "./Titles";
import HomeStyle from "./Home.less";
var Q = require('q');

@Wrapper.Register
class HomeContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {data: []}
    }
    componentWillMount () {
        var self = this;
        Loader.$http().get("/web").then(function (result) {
            self.setState({data: eval(result)});
        });
    }
    render () {
        const onClick = (article) => this.props.onClick("detail", article);
        const { data } = this.state;
        return (
            <div className="wrap_container">
                <div className="wrap_left">
                    <WrapArtOM onClick={onClick} articles={data} />
                    {/*<Title title={"Thể Thao"} borderColor={"orange"} />*/}
                    {/*<WrapArtLine onClick={onClick} articles={articles_line} />*/}
                    {/*<Title title={"Khoa Học"} borderColor={"pink"} />*/}
                    {/*<WrapArtOM onClick={onClick} articles={article_om} direction={"row"} />*/}
                    {/*<Title title={"Ca Nhạc"} borderColor={"yellow"} />*/}
                    {/*<WrapArtLine onClick={onClick} articles={articles_2line} size={3} />*/}
                    {/*<Title title={"Giải Trí"}   />*/}
                    {/*<WrapArtLine onClick={onClick} articles={article_line_1} size={1} artDirection={"row"} />*/}
                </div>
                <div class="wrap_right">
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
                <div class="wrap_right">
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
                <div class="wrap_right">
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
                    {this.form[this.state.container]}
                </div>
            </main>
        )
    }
}

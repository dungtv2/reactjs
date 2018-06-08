import React, { Component } from "react";
import PropTypes from 'prop-types';
import Wrapper from "../../../base/components/Wrapper";
import ArticleStyle from "./Article.less";


class WrapArtLine extends Component {
    static propTypes = {
        size: PropTypes.number,
        artDirection: PropTypes.string,
        linesDirection: PropTypes.string,
        lineDirection: PropTypes.string,
        onClick: PropTypes.func,
        description: PropTypes.bool,
        subString: PropTypes.bool,
        slide: PropTypes.bool,
        slidePosition: PropTypes.string,
        width: PropTypes.string,
        artPosition: PropTypes.string,
    }
    static defaultProps = {
        size: 4,
        artDirection: "column",
        linesDirection: "column",
        direction: "row",
        description: true,
        subString: false,
        sile: false,
        slidePosition: "bottom",
        width: "col_3_7",
        artPosition: "relative",
        onClick: (article) => {}
    }
    constructor (props) {
        super(props);
        const { articles } = this.props;
        this.data = this.prepareArticles(articles);
        this.state = {active: 0}
    }
    componentWillUpdate (nextProps, nextState) {
        const { articles } = nextProps;
        if (articles) {
            this.data = this.prepareArticles(articles);
        }
    }
    prepareArticles = (articles) => {
        const {size} = this.props;
        var new_articles = Object.create(articles);
        var art_size = new_articles.length;
        var result = [];
        if (art_size > size) {
            for (var i=0; i < parseInt(art_size/size); i++) {
                result.push(new_articles.splice(0, size));
            }
        }
        if (new_articles.length)
            result.push(new_articles);
        return result;
    }
    prepareTitle = (title) => {
        if (this.props.subString && title.length > 80) {
            return `${title.substring(0, 80)}...`
        }
        return title
    }
    onSlide = (e, index) => {
        this.setState({active: index});
    }
    renderSimple = () => {
        const {artDirection, direction, onClick, description, width, artPosition} = this.props;
        return description ?
            this.data.map((arts, index) =>
                <div key={index} className={`wrap_art_line ${direction}`}>
                    {arts.map((article, index) =>
                        <Article key={index} img={article['img_medium']} width={width} description={article['description']}
                                 title={this.prepareTitle(article.title)} direction={artDirection} position={artPosition}
                                 onClick={() => onClick(article)}/>
                    )}
                </div>
            )
            :
            this.data.map((arts, index) =>
                <div key={index} className={`wrap_art_line ${direction}`}>
                    {arts.map((article, index) =>
                        <Article key={index} img={article['img_medium']} width={width} direction={artDirection}
                                 title={this.prepareTitle(article.title)} position={artPosition}
                                 onClick={() => onClick(article)}/>
                    )}
                </div>
            )
    }
    renderSlide = () => {
        const {artDirection, direction, onClick, width, slidePosition, artPosition} = this.props;
        const page = <div className="art_slide">
                        <span className={this.state.active == 0 ? "active" : ""}
                              onClick={(e) => this.onSlide(e, 0)}></span>
                        <span className={this.state.active == 1 ? "active" : ""}
                              onClick={(e) => this.onSlide(e, 1)}></span>
                        <span className={this.state.active == 2 ? "active" : ""}
                              onClick={(e) => this.onSlide(e, 2)}></span>
        </div>
        return <React.Fragment>
                    {slidePosition == "top" ? page : null}
                    <div className={`wrap_art_line ${direction}`}>
                        {this.data[this.state.active].map((article, index) =>
                            <Article key={index} img={article['img_medium']} width={width} direction={artDirection}
                                     title={this.prepareTitle(article.title)} position={artPosition} onClick={() => onClick(article)}/>)}
                    </div>
                    {slidePosition == "bottom" ? page : null}
              </React.Fragment>
    }
    render () {
        const {slide, linesDirection} = this.props;
        return (
            <div className={`wrap_art_lines ${linesDirection}`}>
                {   slide
                    ? this.renderSlide()
                    : this.renderSimple()
                }
            </div>
        )
    }
}

class DragBox extends React.Component {
    static propTypes = {
        data: PropTypes.array,
    }
    static defaultProps = {
        data: []
    }
    state = {
        hasCapture: false,
        position: 0,
        page: 1,
        numberPage: 0,
    };
    isDragging = false;
    previousLeft = 0;
    previousTop = 0;
    constructor (props) {
        super(props);
        this.size = 9;
        this.myUl = React.createRef();
        this.myContainer = React.createRef();
        this.item = React.createRef();
        this.left = React.createRef();
        this.right = React.createRef();
    }
    onDown = event => {
        this.isDragging = true;
        event.target.setPointerCapture(event.pointerId);
        // We store the initial coordinates to be able to calculate the changes
        // later on.
        this.extractPositionDelta(event);
    };
    componentDidMount () {
        var { number_page } = this.prepareArg();
        this.addStyle(this.state.position);
        this.setState({numberPage: number_page});
    }
    prepareArg = () => {
        const size = 8;
        const item_margin = 20;
        const padding = 20;
        const con_width = this.myContainer.current.offsetWidth;
        const item_width = this.myUl.current.firstElementChild.offsetWidth;
        const items_size = Math.abs(parseInt(con_width/item_width)); // items in per page
        const items_width = items_size*item_width; // items width in per page
        const max_width = ((size*item_width-con_width) + (padding*2) + (size - 1)*item_margin)*-1;
        var number_page = parseInt(size/items_size);
        if (size%items_size > 0) {
            number_page += 1;
        }
        this.max_width = max_width;
        this.number_page = number_page;
        return {number_page: number_page, con_width: con_width, item_width: item_width,
            items_size: items_size, items_width: items_width, max_width: max_width, item_margin: item_margin}
    }
    onDotSlide = (page) => {
        let { items_size, items_width, max_width, item_margin } = this.prepareArg();
        let position = ((page - 1)*items_width + (page - 1)*items_size*item_margin)*-1;
        if (position > 0) {
            position = 0;
        }
        if (position < max_width) {
            position = max_width;
        }
        this.addStyle(position);
        this.setState({page: page, position: position});
    }
    onBtnSlide = (type="next") => {
        var {number_page, items_size, items_width, max_width, item_margin} = this.prepareArg();
        var {page, position} = this.state;
        if (type == "next" && page < number_page) {
            page += 1;
            position += -(items_width + items_size * item_margin);
        }else if (type == "prev" && page > 1) {
            page -= 1;
            position -= -(items_width + items_size * item_margin);
        }
        if (position > 0) {
            position = 0;
        }
        if (position < max_width) {
            position = max_width;
        }
        this.addStyle(position);
        this.setState({page: page, position: position});
    }
    onMoveSlide = () => {
        var { position } = this.state;
        var { items_size, items_width, max_width, item_margin } = this.prepareArg();
        var page = 1;
        if (position > 0) {
            position = 0;
        }else{
            var page_size = Math.abs(parseInt(position/items_width));
            var surplus_width = Math.abs(position%items_width);
            var position = (page_size * items_width + page_size*items_size*item_margin) * -1;
            if (surplus_width > items_width/2) {
                position += -items_width - items_size*item_margin;
            }
            if (position < max_width) {
                position = max_width;
            }
            page = Math.abs(parseInt(position/items_width)) + 1;
            surplus_width = Math.abs(position%items_width);
            if (surplus_width > items_width/2) {
                page += 1;
            }
        }
        this.addStyle(position);
        this.setState({hasCapture: false, position: position, page: page});
    }
    addStyle = (position) => {
        if (position >= 0) {
            this.left.current.classList.add("active");
            this.right.current.classList.remove("active");
        }
        if (position < 0 && position > this.max_width) {
            this.left.current.classList.remove("active");
        }
        if (position <= this.max_width) {
            this.left.current.classList.remove("active");
            this.right.current.classList.add("active");
        }
    }
    onMove = event => {
        this.addStyle(this.state.position);
        if (!this.isDragging) {
            return;
        }
        const {left, top} = this.extractPositionDelta(event);
        this.setState(({position}) => ({
            position: position + left,
        }));
    };
    onMoveOut = event => {
        this.addStyle(this.state.position);
    }
    onUp = event => {
        this.isDragging = false;
    };
    onGotCapture = event => {
        this.setState({hasCapture: true});
    };
    onLostCapture = event =>{
        this.onMoveSlide();
    }
    extractPositionDelta = event => {
        const left = event.pageX;
        const top = event.pageY;
        const delta = {
            left: left - this.previousLeft,
            top: top - this.previousTop,
        };
        this.previousLeft = left;
        this.previousTop = top;
        return delta;
    };
    prepareTitle = (title) => {
        if (title.length > 90) {
            return `${title.substring(0, 90)}...`
        }
        return title;
    }
    render() {
        const { position } = this.state;
        const { data } = this.props;
        return (
            <div className="drag_box">
                <div className="art_slide">
                    {Array.from(Array(this.state.numberPage).keys()).map((d, k) =>
                        <span key={k} className={this.state.page == d+1 ? "active": ""} onClick={() => this.onDotSlide(d+1)}></span>)}
                </div>
                <div className="wrap_drag" ref={this.myContainer}>
                    <ul style={{marginLeft: position}} ref={this.myUl}
                        onMouseOut={this.onMoveOut}
                        onPointerDown={this.onDown}
                        onPointerMove={this.onMove}
                        onPointerUp={this.onUp}
                        onPointerCancel={this.onUp}
                        onGotPointerCapture={this.onGotCapture}
                        onLostPointerCapture={this.onLostCapture}
                    >
                        {data.map((article, index) =>
                            <Article ref={this.item} key={index} title={this.prepareTitle(article['title'])}
                                     img={article['img_medium']} />)}
                    </ul>
                    <div className="wrap_prev" ref={this.left}>
                        <i className={"fa fa-long-arrow-left"} onClick={() => this.onBtnSlide("prev")}></i>
                    </div>
                    <div className="wrap_next" ref={this.right}>
                        <i className={"fa fa-long-arrow-right"} onClick={() => this.onBtnSlide("next")}></i>
                    </div>
                </div>
            </div>
        );
    }
}

class WrapArtSingle extends Component {
    static propTypes = {
        topWidth: PropTypes.string,
        lineWidth: PropTypes.string,
        onClick: PropTypes.func,
        hot: PropTypes.array,
        B: PropTypes.string,
        fB: PropTypes.string,
        rB: PropTypes.string,
        tB: PropTypes.string,
        size: PropTypes.number,
        slide: PropTypes.bool,
        type: PropTypes.number,
    }
    static defaultProps = {
        B: 'white',
        rB: "#f5f1f1",
        fB: "#f5f1f1",
        tB: "#f5f1f1",
        topWidth: "col_5_5",
        lineWidth: "col_4_6",
        hot: [],
        size: 3,
        slide: false,
        type: 3,
        onClick: (article) => {}
    }
    constructor (props) {
        super(props);
    }
    prepareType = (type) => {
        if (type == 1) {
            return {direction: "column", linesDirection: "column",  lineDirection: "row", topDirection: "row",
                artDirection: "column", slidePosition: "bottom"}
        }else if (type == 2) {
            return {direction: "row", linesDirection: "column",  lineDirection: "column", topDirection: "column",
                artDirection: "row", slidePosition: "bottom"}
        }else if (type == 3) {
            return {direction: "column", linesDirection: "column", lineDirection: "column", topDirection: "column",
                artDirection: "row", slidePosition: "top"}
        }else if (type == 4) {
            return {direction: "column", linesDirection: "row", lineDirection: "column", topDirection: "row",
                artDirection: "row", slidePosition: "top"}
        }else if (type == 5) {
            return {direction: "column", linesDirection: "column", lineDirection: "row", topDirection: "column",
                artDirection: "column", slidePosition: "top"}
        }
    }
    prepareTitle = (title) => {
        if (title.length > 90) {
            return `${title.substring(0, 90)}...`
        }
        return title;
    }
    akc = () => {
        return <div className="person">
            <ul>
                <li>
                    <a style={{"background-image": "url(/assets/img/sontung.jpg)", backgroundSize: "100px"}}></a>
                </li>
                <li>
                    <a style={{"background-image": "url(/assets/img/david.jpg)", backgroundSize: "100px"}}></a>
                </li>
                <li>
                    <a style={{"background-image": "url(/assets/img/bichphuong.jpeg)", backgroundSize: "100px"}}></a>
                </li>
                <li>
                    <a style={{"background-image": "url(/assets/img/sc.jpeg)", backgroundSize: "100px"}}></a>
                </li>
            </ul></div>;
    }
    render () {
        const {articles, onClick, size, slide, lineWidth, topWidth, type, B, rB, fB, tB, hot} = this.props;
        let hot_article = articles[0] || {};
        const {lineDirection, linesDirection, direction, topDirection, artDirection, slidePosition} = this.prepareType(type)
        return (
            <div className={`wrap_art_single ${direction}`} style={{background: B}}>
                <div className="art_left" style={{background: fB}}>
                    <div className="wrap_art_left">
                        <Article img={hot_article['img_top']} width={topWidth} direction={topDirection}
                                 title={this.prepareTitle(hot_article['title'])}
                                 description={hot_article['description']}
                                 onClick={(articles) => onClick} />
                        {
                            hot.length > 0 ? this.akc() : null
                        }
                    </div>
                </div>
                <div className="art_right" style={{background: rB}}>
                    <DragBox data={articles} />
                    {/*<WrapArtLine onClick={onClick} articles={articles} artDirection={artDirection}*/}
                                 {/*linesDirection={linesDirection} direction={lineDirection} slide={slide}*/}
                                 {/*width={lineWidth} size={size} description={false} subString={true} slidePosition={slidePosition} />*/}
                </div>
            </div>
        )
    }
}


// Wap Article OneMany
class WrapArtOM extends Component {
    static propTypes = {
        direction: PropTypes.string,
        onClick: PropTypes.func,
        slide: PropTypes.bool,
        background: PropTypes.string,
        size: PropTypes.number,
    }
    static defaultProps = {
        direction: "column",
        slide: false,
        background: 'rgb(205, 205, 205, 0.3)',
        size: 3,
        onClick: (article) => {}
    }
    constructor (props) {
        super(props);
        this.state = {line: []}
    }
    render () {
        const {articles, direction, onClick, slide, background, size} = this.props;
        let hot_article = articles[0] || {};
        return (
            <div className={`wrap_art_om ${direction}`}>
                <div className="art_left" style={{background: background}}>
                    <Article img={hot_article['img_top']} title={hot_article['title']}
                             description={hot_article['description']} width={"col_6_4"}
                             onClick={(articles) => onClick} direction={direction == "row" ? "column" : "row"}/>
                </div>
                <div className="art_right">
                    <WrapArtLine onClick={onClick} artDirection={direction} articles={articles} size={size}
                                 slide={slide} description={false} subString={true} />
                </div>
            </div>
        )
    }
}


export default class Article extends Component {
    static propTypes = {
        img: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        direction: PropTypes.string,
        onClick: PropTypes.func,
        titleTag: PropTypes.string,
        reference: PropTypes.array,
        width: PropTypes.string,
        position: PropTypes.string,
        style: PropTypes.object,
        // style: PropTypes.object,
    }
    static defaultProps = {
        img: "/assets/img/default.png",
        title: "Your Title",
        direction: "column",
        titleTag: "h4",
        width: "col_3_7",
        position: "relative",
        style: {},
    }
    constructor (props) {
        super(props);
    }
    preTitleReference = (title) => {
        if (title.length > 80) {
            return `${title.substring(0, 80)}...`
        }
        return title
    }

    render () {
        const { img, title, description, direction, onClick, reference, width, position, style } = this.props;
        return (
            <div className={`article ${position} ${direction} ${width}`} style={style}>
                <div onClick={onClick} className="art_img">
                    <img src={img} />
                </div>
                <div onClick={onClick} className="art_detail">
                    <h4 className="art_title">{title}</h4>
                    {description ? <p className="art_des">{description}</p> : null}
                </div>
                {
                    reference ?
                        <div className="art_reference">
                            {reference.map((re, index) => <a key={index}>* {this.preTitleReference(re.title)}</a>)}
                        </div>
                        : null
                }
            </div>
        )
    }
}


module.exports = {Article: Article, WrapArtOM: WrapArtOM, WrapArtLine: WrapArtLine, WrapArtSingle: WrapArtSingle}
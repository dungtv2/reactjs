import React, { Component, PropTypes } from "react";
import Wrapper from "../../../base/components/Wrapper";
import ArticleStyle from "./Article.less";


class WrapArtLine extends Component {
    static propTypes = {
        size: PropTypes.int,
        artDirection: PropTypes.string,
        onClick: PropTypes.func,
    }
    static defaultProps = {
        size: 4,
        artDirection: "column",
        onClick: (article) => {}
    }
    constructor (props) {
        super(props);
    }
    prepareArticles = (articles) => {
        const {size} = this.props;
        var art_size = articles.length;
        var result = [];
        if (art_size > size) {
            for (var i=0; i < parseInt(art_size/size); i++) {
                result.push(articles.splice(0, size));
            }
        }
        result.push(articles);
        return result;
    }
    render () {
        const {articles, artDirection, onClick} = this.props;
        return (
            <div className="wrap_art_lines">
                {this.prepareArticles(articles).map((arts) =>
                    <div className="wrap_art_line">
                        {arts.map((article, index) =>
                            <Article onClick={() => onClick(article)} direction={artDirection} {...article} />
                        )}
                    </div>
                )}
            </div>
        )
    }
}

// Wap Article OneMany
class WrapArtOM extends Component {
    static propTypes = {
        direction: PropTypes.string,
        onClick: PropTypes.func,
    }
    static defaultProps = {
        direction: "column",
        onClick: (article) => {}
    }
    constructor (props) {
        super(props);
    }
    render () {
        const {articles, direction, onClick} = this.props;
        return (
            <div className={`wrap_art_om ${direction}`}>
                <div className="art_left">
                    <Article onClick={(articles) => onClick}
                             direction={direction == "row" ? "column" : "row"}
                             {...articles[0]} />
                </div>
                <div className="art_right">
                    {articles.map((article, index) =>
                        <Article onClick={() => onClick(article)} direction={direction} {...article} />
                    )}
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
    }
    static defaultProps = {
        img: "/assets/img/default.png",
        title: "Your Title",
        direction: "column",
        titleTag: "h4",
    }
    constructor (props) {
        super(props);
    }
    render () {
        const { img, title, description, direction, onClick } = this.props;
        return (
            <div className={`article ${direction}`}>
                <div onClick={onClick} className="art_img">
                    <img src={img} />
                </div>
                <div onClick={onClick} className="art_detail">
                    <h4 className="art_title">{title}</h4>
                    <p className="art_des">{description}</p>
                </div>
            </div>
        )
    }
}


module.exports = {Article: Article, WrapArtOM: WrapArtOM, WrapArtLine: WrapArtLine}
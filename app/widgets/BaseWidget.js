class GroupSocial extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    }
    static defaultProps = {
        children: null,
    }
    render () {
        return (
            <div className="su--social_links pull-right">
                {this.props.children}
            </div>
        )
    }
}

@Register
class SocialComponent extends Component {
    static propTypes = {
        icon: PropTypes.string,
        onClick: PropTypes.func
    }
    static defaultProps = {
        icon: "facebook",
        onClick: () => {alert("Clicked!")}
    }
    constructor(props){
        super(props);
    }
    onClick = (e) => {
        this.props.onClick()
    }
    render() {
        const { icon } = this.props;
        return (
            <a onClick={this.onClick}>
                <i className={`fa fa-${icon}`}></i>
            </a>
        )
    }
}

class Link extends Component {
    static propTypes = {
        href: PropTypes.string,
        string: PropTypes.string,
        title: PropTypes.string,
    }
    static defaultProps = {
        href: "/page/website-builder",
        string: "Website made with",
        title: "ReactJS",
    }
    constructor (props) {
        super(props);
    }
    render () {
        const { href, string, title } = this.props;
        return (
            <a className="small" href={href}>
                {string} <span className="">{title}</span>
            </a>
        )
    }
}
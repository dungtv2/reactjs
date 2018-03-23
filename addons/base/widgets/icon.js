import React, { PropTypes } from "reactjs";
import Wrapper from "../components";


@Wrapper.Register
class Icon extends Component {
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


module.exports = {Icon: Icon}

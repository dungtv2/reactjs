import React, { PropTypes } from "reactjs";


export default class Button extends React.Component {
    static propTypes = {
        string: PropTypes.string,
        name: PropTypes.string,
        onClick: PropTypes.func,
        type: PropTypes.string,
        fontWeight: PropTypes.bool
    }
    static defaultProps = {
        string: "Button",
        name: "btn",
        onClick: () => {alert("clicked!.")},
        type: "primary",
        fontWeight: true
    }
    constructor (props) {
        super(props);
    }
    onClick = () => {
        this.props.onClick();
    }
    render () {
        const { string, name, type, fontWeight } = this.props;
        return (
            <button name={name} onClick={this.onClick} className={`btn btn-${type}`}>
                {fontWeight
                    ? <strong>{string}</strong>
                    : {string}
                }
            </button>
        )
    }
}
import React, { PropTypes } from "reactjs";
import Wrapper from "../components"


@Wrapper.Register
class SearchView extends React.Component {
    static propTypes = {
        placeholder: PropTypes.string,
        value: PropTypes.string,
        onClick: PropTypes.func,
        onChange: PropTypes.func
    }
    static defaultProps = {
        placeholder: "Search here!",
        value: "",
        onClick: () => {alert("nothing")},
        onChange: (e) => {alert("text change")},
    }
    constructor (props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.value = this.props.value;
    }
    onChange = (e) => {
        this.value = e.target.value;
        this.props.onChange(this.value)
    }
    onClick = () => {
        this.props.onClick(this.value);
    }
    render () {
        const { value, placeholder } = this.props;
        return (
            <div className="su--search-main">
                <input type="text"
                       name="search" className="su--search-query form-control"
                       defaultValue={value}
                       placeholder={placeholder} onChange={this.onChange} />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-link su--btn_search-main"
                            onClick={this.onClick}>
                        <i className="fa fa-search" />
                    </button>
                </span>
            </div>
        )
    }
}


module.exports = {SearchView: SearchView}
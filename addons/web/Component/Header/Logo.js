import React, { Component, PropTypes } from 'react';
import Wrapper from '../../../base/components/Wrapper';


@Wrapper.Register
export default class Logo extends Component {
    static propTypes = {
        href: PropTypes.string,
        image: PropTypes.string,
        label: PropTypes.string,
    }
    static defaultProps = {
        href: null,
        image: null,
        label: "NOTHING"
    }
    constructor (props){
        super(props);
    }
    render () {
        const { href, image, label } = this.props;
        return (
            <a href={href} className="su_header_logo">
                {image ? <image src={image} />: label}
            </a>
        )
    }
}
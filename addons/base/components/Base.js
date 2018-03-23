import React from 'react'
var U = require('react-addons-update');


class Component extends React.Component {
    constructor (props) {
        super(props);
    }
    alert = (message = {title: "Nothing", description: "Nothing at all"}) => {
        alert(message.title);
    }
    render () {
        return null;
    }
}


module.exports = {Component: Component}

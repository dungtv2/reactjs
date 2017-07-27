import React, { Component } from 'react'


function Pp(WrappedComponent){
    const render = WrappedComponent.prototype.render;
    WrappedComponent.prototype.render = function(){
        if (this.__proto__.hasOwnProperty("__onBeforeRender")){
            this.__onBeforeRender();
        }
        if (this.props.hasOwnProperty("app")) {
            let self = Object.assign({}, this)
            let app = Object.assign({}, this.props.app);
            app[this.constructor.name] = self;
            this.app = app;
        }
        return render.bind(this)();
    }
    return class BaseView extends Component {
        constructor(props){
            super(props);
            this.setAppForComponent = this.setAppForComponent.bind(this);
        }
        setAppForComponent(wrappedComponentInstance) {
            console.log("abc");
        }
        render () {
            const injectedProp = this.setAppForComponent;
            let newProps = Object.assign({}, this.props, {ref: this.setAppForComponent});
            return <WrappedComponent injectedProp={injectedProp} {...newProps} />
        }
    }
}

module.exports = {Pp: Pp}
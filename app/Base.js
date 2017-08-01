import React, { Component } from 'react'


function Pp(WrappedComponent){
    const render = WrappedComponent.prototype.render;
    WrappedComponent.prototype.render = function(){
        if (this.__proto__.hasOwnProperty("__onBeforeRender")){
            this.__onBeforeRender();
        }
        // var owner = this._reactInternalInstance._currentElement._owner._instance;
        // if (owner.props.hasOwnProperty("app")){
        //     let self = Object.assign({}, this);
        //     let app = Object.assign({}, owner.props.app);
        //     app[this.constructor.name] = self;
        //     this.app = app;
        // }
        // set attr app for component
        if (this.props.hasOwnProperty("app")) {
            let self = Object.assign({}, this)
            let app = Object.assign({}, this.props.app);
            app[this.constructor.name] = self;
            this.app = app;
        }
        return render.bind(this)();
    };
    return class BaseView extends Component {
        constructor(props){
            super(props);
            this.set$ElForComponent = this.set$ElForComponent.bind(this);
        }
        set$ElForComponent(wrappedComponentInstance) {
            // set attr $el for component
            if (wrappedComponentInstance) {
                wrappedComponentInstance.$el = $(wrappedComponentInstance._reactInternalInstance._renderedComponent.getPublicInstance());
                if (wrappedComponentInstance.__proto__.hasOwnProperty("__onAfterRender")){
                    wrappedComponentInstance.__proto__.__onAfterRender.bind(wrappedComponentInstance)();
                }
            }
        }
        render () {
            // this.owner = this._reactInternalInstance._currentElement._owner._instance;
            const injectedProp = this.set$ElForComponent;
            let newProps = Object.assign({}, this.props, {ref: this.set$ElForComponent});
            return <WrappedComponent injectedProp={injectedProp} {...newProps} />
        }
    }
}

module.exports = {Pp: Pp}
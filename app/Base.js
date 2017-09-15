import React, { Component } from 'react'


function Pp(WrappedComponent){
    const render = WrappedComponent.prototype.render;
    WrappedComponent.prototype.render = function(){
        if (this.__proto__.hasOwnProperty("__onBeforeRender")){
            this.__onBeforeRender();
        }

        var app = null;
        var self = Object.assign({}, this);
        if (this.constructor.root) {
            app = this.props.app || this.app || {};
        }else {
            var owner = this._reactInternalInstance._currentElement._owner._currentElement._owner;
            if (owner) {
                var owner_instance = owner._instance;
                // set ComponentChild for component parent
                let owner_instance_app = owner_instance.app[owner_instance.constructor.name];
                let componentName = this.constructor.name;
                if (!owner_instance_app.hasOwnProperty('componentChild')) {
                    owner_instance_app.componentChild = {};
                }
                let componentChild = owner_instance_app['componentChild'];

                self.componentParent = owner_instance_app;
                this.componentParent = owner_instance_app;
                // let componentChild = owner_instance_app.componentChild;

                if (componentChild.hasOwnProperty(componentName)){
                    if (componentChild[componentName] instanceof Array){
                        componentChild[componentName].push(self);
                    }else{
                        componentChild[componentName] = [componentChild[componentName], self];
                    }
                }else{
                    componentChild[componentName] = self;
                }
                app = owner_instance.app || owner_instance.props.app;
            }
        }
        // set attr app for component
        if (app) {
            let _app = Object.assign({}, app);
            _app[this.constructor.name] = self;
            this.app = _app;
        }
        return render.bind(this)();
    };

    return class BaseView extends Component {
        constructor(props){
            super(props);
        }
        set$ElForComponent = (wrappedComponentInstance) => {
            // set attr $el for component
            if (wrappedComponentInstance && wrappedComponentInstance._reactInternalInstance._renderedComponent.getPublicInstance) {
                wrappedComponentInstance.$el = $(wrappedComponentInstance._reactInternalInstance._renderedComponent.getPublicInstance());
                if (wrappedComponentInstance.__proto__.hasOwnProperty("__onAfterRender")){
                    wrappedComponentInstance.__proto__.__onAfterRender.bind(wrappedComponentInstance)();
                }
            }
        }
        render () {
            // this.owner = this._reactInternalInstance._currentElement._owner._instance;
            // const injectedProp = this.set$ElForComponent;
            let newProps = Object.assign({}, this.props, {ref: this.set$ElForComponent});
            return <WrappedComponent {...newProps} />
        }
    }
}

module.exports = {Pp: Pp}
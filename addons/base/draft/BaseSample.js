import React, { Component } from 'react'
// import U from 'react-addons-update'
var U = require('react-addons-update');
import xpath from 'xpath';
import dom from 'xmldom';


// var StoreComponent = {};


class StoreComponent extends Object {

    inheritStore = {};
    componentStore = {};
    stateGlobal = {};
    stateStore = {};
    getState = function () {

    };
    setState = function () {

    };
    getProps = function () {

    };
    setProps = function () {

    }
    getComponent = function (componentName) {
        return this.componentStore[componentName];
    }
}

var store = new StoreComponent();
//
// function Register1(storeComponent=true, inherit=null){
//
//     return (InnerComponent) => {
//         const render = InnerComponent.prototype.render;
//         InnerComponent.prototype.render = function(){
//             if (this.__proto__.hasOwnProperty("__onBeforeRender")){
//                 this.__onBeforeRender();
//             }
//             var self = this;
//             var componentName = this.constructor.name;
//             if (storeComponent)
//                 store.componentStore[componentName] = self;
//
//             if (inherit)
//                 if (!store.inheritStore.hasOwnProperty(inherit))
//                     store.inheritStore[inherit] = [];
//                 store.inheritStore[inherit].push(self);
//             // check component inherit
//             if (this.html){
//                 this.html = new dom.DOMParser().parseFromString(this.html, "html");
//                 if (store.inheritStore.hasOwnProperty(componentName)){
//                     Object.keys(store.inheritStore[componentName]).map((k) =>
//                         store.inheritStore[componentName][k] = ''
//                     )
//                 }
//             }
//             return render.bind(this)();
//         };
//
//         return class BaseView extends Component {
//             constructor(props){
//                 super(props);
//             }
//             render () {
//                 let newProps = Object.assign({}, this.props, {ref: this.set$El});
//                 return <WrappedComponent {...newProps} />
//             }
//         }
//     }
// }

// var first = true;

function Register(WrappedComponent){

    const render = WrappedComponent.prototype.render;
    WrappedComponent.prototype.getComponent = function (componentName) {
        return store.getComponent(componentName);
    };
    WrappedComponent.prototype.setStoreState = function (name, stateName, value) {
        let a = {}
        a[stateName] = value;
        store.componentStore[name].setState(a);
        // aka.a = 20;
    };
    WrappedComponent.prototype.setAttribute = function (name, attrName, value) {
        store.componentStore[name][attrName] = value;
    };

    WrappedComponent.prototype.updateState = function (state={}) {
        var newState = {};
        for (let [k, v] of Object.entries(state)){
            newState[k] = v
        }
    };
    WrappedComponent.prototype.render = function(){
        if (this.__proto__.hasOwnProperty("__onBeforeRender")){
            this.__onBeforeRender();
        }
        var self = this;
        store.componentStore[this.constructor.name] = self;

        // if (this.hasOwnProperty("html")){
        //     console.log("ok");
        // }
        return render.bind(this)();
    };

    return class BaseView extends Component {
        constructor(props){
            super(props);
        }
        set$El = (wrappedComponentInstance) => {
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
            let newProps = Object.assign({}, this.props, {ref: this.set$El});
            return <WrappedComponent {...newProps} />
        }
    }
}

module.exports = {Register: Register}
// var app = null;
// var self = Object.assign({}, this);
// self.setState = this.setState;
// if (this.constructor.root) {
//     app = this.props.app || this.app || {};
// }else {
//     var owner = this._reactInternalInstance._currentElement._owner._currentElement._owner;
//     if (owner) {
//         var owner_instance = owner._instance;
//         app = owner_instance.app || owner_instance.props.app;
//     }
// }


// // set ComponentChild for component parent
// let owner_instance_app = owner_instance.app[owner_instance.constructor.name];
// let componentName = this.constructor.name;
// if (!owner_instance_app.hasOwnProperty('componentChild')) {
//     owner_instance_app.componentChild = {};
// }
// let componentChild = owner_instance_app['componentChild'];
// // set ComponentParent for this
// self.componentParent = owner_instance_app;
// this.componentParent = owner_instance_app;
// // let componentChild = owner_instance_app.componentChild;
//
// if (componentChild.hasOwnProperty(componentName)){
//     if (componentChild[componentName] instanceof Array){
//         componentChild[componentName].push(self);
//     }else{
//         componentChild[componentName] = [componentChild[componentName], self];
//     }
// }else{
//     componentChild[componentName] = self;
// }

// set attr app for component
// if (app) {
//     let _app = Object.assign({}, app);
//     _app[this.constructor.name] = self;
//     this.app = _app;
//     // if (!StoreComponent.hasOwnProperty(this.constructor.name)){
//     StoreComponent[this.constructor.name] = _app;
//     // }
// }else{
//     StoreComponent[this.constructor.name] = self;
// }
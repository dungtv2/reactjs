import React from 'react'
// import U from 'react-addons-update'
var U = require('react-addons-update');


// var StoreComponent = {};


class StoreComponent extends Object {

    inheritStore = {};
    componentStore = {};
    dataStore = {};
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


function Register(WrappedComponent){

    const render = WrappedComponent.prototype.render;

    WrappedComponent.prototype.setDataStore = function (dataName, dataValue) {
        store.dataStore[dataName] = dataValue;
    }

    WrappedComponent.prototype.getDataStore = function (dataName, defaultValue={}) {
        return store.dataStore[dataName] || defaultValue;
    }

    WrappedComponent.prototype.setSateStore = function (componentName, stateData={}) {
        store.componentStore[componentName].setState(stateData);
    }

    WrappedComponent.prototype.getSateStore = function (componentName, stateName) {
        return store.componentStore[componentName].getState(stateName);
    }

    WrappedComponent.prototype.render = function(){
        if (this.__proto__.hasOwnProperty("__onBeforeRender")){
            this.__onBeforeRender();
        }
        var self = this;
        store.componentStore[this.constructor.name] = self;
        return render.bind(this)();
    };

    return class BaseView extends React.Component {
        constructor(props){
            super(props);
        }
        set$El = (wrappedComponentInstance) => {
            // set attr $el for component
            // if (wrappedComponentInstance && wrappedComponentInstance._reactInternalInstance._renderedComponent.getPublicInstance) {
            //     wrappedComponentInstance.$el = $(wrappedComponentInstance._reactInternalInstance._renderedComponent.getPublicInstance());
            //     if (wrappedComponentInstance.__proto__.hasOwnProperty("__onAfterRender")){
            //         wrappedComponentInstance.__proto__.__onAfterRender.bind(wrappedComponentInstance)();
            //     }
            // }
        }
        render () {
            let newProps = Object.assign({}, this.props, {ref: this.set$El});
            return <WrappedComponent {...newProps} />
        }
    }
}


module.exports = {Register: Register}

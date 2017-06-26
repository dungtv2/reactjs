import React from 'react';
import styles from './App.css';
import styleok from './ok.less';
import styleok1 from './lala.less';
import {createStore} from 'redux'
var Q = require('q');
var R = require('ramda');


export class Promise {
    constructor (params) {
        this.params = params || {};
        this.method = "GET";
        this.expect = "TEXT";
        this.data = null
        this.start();
    }
    /**
     * Write attribute for class
     **/
    start() {
        for (let [k, v] of Object.entries(this.params)){
            this[k] = v
        }
    }
    data_expect(){
        if (this.data){
            let data = null
            switch (this.expect){
                case "TEXT":
                    data = this.data.text();
                    break;
                case "JSON":
                    data = this.data.json();
                    break;
                case "BLOB":
                    data = this.data.blob();
                    break;
                case "FORM":
                    data = this.data.formData();
                    break;
                case "ARRAY":
                    data = this.data.arrayBuffer();
                    break;
            }
            return data
        }
        return false
    }
    promise(){
        let self = this, params_fetch = {
            method: this.method,
            cache: 'default',
            body: this.data
        }
        return Q.fcall(function () {
            return fetch(self.url, params_fetch).then(res => {
                return self.data_expect(res, self.expect);
            }).then(res => {
                return res
            }).catch(error => {
                throw error
            })
        });
    }
}

class Model{
    constructor(){
        this.name = "Hello"
        this.index = 0
    }
    call_func(){
        return
    }
}


var defaultState = {}

class Action{
    static actionUnlink(){
        return {
            type: "UNLINK",
            message: "nothing",
            data: {}
        }
    }
    static actionCreate(){
        return {
            type: "CREATE",
            message: "nothing",
            data: {}
        }
    }
    static actionWrite(){
        return {
            type: "WRITE",
            message: "nothing",
            data: {}
        }
    }
    static actionSearch(){
        return {
            type: "SEARCH",
            message: "nothing",
            data: {}
        }
    }
}
class Reducer{
    static reducerData(){

    }
}
function MyReducer(state, action){
    let newState = {}
    switch (action.type){
        case "UNLINK":
            newState = Object.assign({}, state);
            return newState;
        case "CREATE":
            newState = Object.assign({}, state);
            Action.actionCreate();
            return newState;
        case "WRITE":
            newState = Object.assign({}, state);
            Action.actionWrite();
            return newState;
        case "SEARCH":
            newState = Object.assign({}, state);
            Action.actionSearch();
            return newState;
        default:
            return state
    }
}
var store = createStore(MyReducer, defaultState)


export class ViewBase extends React.Component {
    constructor(props) {
        super(props);
        this.start = this.start.bind(this);
        this.start();
    }
    start() {
        this.init_params = this.init_params.bind(this);
        this.init_functions = this.init_functions.bind(this);
        this.init_params();
        this.init_functions();
    }
    init_params() {
    }
    init_functions() {
    }
    render() {
        return (<div>Nothing</div>)
    }
}


export class Application extends ViewBase {
    constructor(props) {
        super(props)
    }
}

// export class Data extends Object{
//     constructor(props) {
//         super(props);
//     }
//     create (values) {
//         return this.myPromise("/create").then(function (data) {
//
//         });
//     }
//     update (ids=[], values) {
//         return this.myPromise("/update").then(function (data) {
//
//         });
//     }
//     delete (ids=[]) {
//         return this.myPromise("/delete").then(function (data) {
//
//         });
//     }
//     search (fields, order='id', limit=false, group_by=false){
//         return true
//     }
//     myPromise(url, method='get') {
//         return Q.fcall(function () {
//             return fetch(url, {method: method}).then(res => {
//                 // return res.json();
//                 return res.text()
//             }).then(json => {
//                 return json
//             }).catch(function(err){
//                 throw err
//             });
//         });
//     }
// }

export default class App extends ViewBase {
    constructor(props) {
        super(props);
        this.state = {test: 'foo'};
        var promise = new Promise({data: "HELLO"})
        alert("abc")
    }
    start(){
        this.super.start();
        alert("lili");
        this.myPromise = this.myPromise.bind(this);
        // this.buttonClick = this.buttonClick.bind(this);
    }
    init_functions(){
    //     this.myPromise = this.myPromise.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    }
    create (values) {
        return this.myPromise("/create").then(function (data) {

        });
    }
    update (ids=[], values) {
        return this.myPromise("/update").then(function (data) {

        });
    }
    delete (ids=[]) {
        return this.myPromise("/delete").then(function (data) {

        });
    }
    search (fields, order='id', limit=false, group_by=false){
        return true
    }
    myPromise(url, method='get') {
        return Q.fcall(function () {
            return fetch(url, {method: method}).then(res => {
                    // return res.json();
                    return res.text()
                }).then(json => {
                    return json
                }).catch(function(err){
                    throw err
            });
        });
    }
    buttonClick(){
        this.myPromise("/list/23").then(function (data) {
            alert(data);
        });
    }
    render() {
        return (
        <div className="lala">
            <button onClick={this.buttonClick}>ABC</button>
        </div>
        );
    }
}

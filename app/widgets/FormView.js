import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const loggerMiddleware = createLogger();
var defaultState = {};

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
    static receiveData(data={}) {
        return {
            type: "RECEIVE",
            message: "nothing",
            data: data

        }
    }
    static fetchPosts(params={}){
        return function (){
            return (new Promise(params)).promise().then(function(data) {
                store.dispatch(Action.receiveData({data: data}));
            })
        };
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
            return newState
        case "WRITE":
            newState = Object.assign({}, state);
            return newState;
        case "SEARCH":
            newState = Object.assign({}, state);
            return newState;
        case "RECEIVE":
            newState = Object.assign({}, state, {data: action.data})
            return newState
        default:
            return state
    }
}

var store = createStore(MyReducer, defaultState, applyMiddleware(thunkMiddleware, loggerMiddleware));

module.exports = {Action: Action, store: store}
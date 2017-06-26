/**
 * Created by hp on 6/22/17.
 */
import redux from 'redux'



var defaultState = {}

function actionUnlink(state, action){
    return {
        type: "UNLINK"
    }
}

function actionCreate(){
    return {
        type: "CREATE"
    }
}

function actionWrite(){
    return {
        type: "WRITE"
    }
}

function actionSearch(){
    return {
        type: "SEARCH"
    }
}

function actionTodo(state, action){
    switch (action.type){
        case "UNLINK":
            return;
        case "CRATE":
            return;
        case "WRITE":
            return;
        case "SEARCH":
            return;
        default:
            break;
    }
}

store = redux.createStore(actionTodo, defaultState)
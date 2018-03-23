import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";
import C from "../Component.less";


export default class App extends React.Component {
    constructor (props) {
        super(props);
    }
    render() {
        return (
            <div id="app" style={{paddingBottom: "250px"}}>
                <Header/>
                <Main/>
                <Footer/>
            </div>
        )
    }
}


module.exports = {App: App}

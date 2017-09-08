import React, { Component, PropTypes } from 'react';
import c from './Component.less';
import { Pp } from './Base.js';
var U = require('react-addons-update');
// import {withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import GoogleMapLoader from "react-google-maps-loader"


import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
    render() {
        return (
            <Map google={this.props.google} zoom={14}>

                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDQxjAooOjVtVXe88dfgSAlIAr0Z4M9JKo')
})(MapContainer)

//
// var x = document.getElementById("demo");
//
// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }
//
// function showPosition(position) {
//     x.innerHTML = "Latitude: " + position.coords.latitude +
//         "<br>Longitude: " + position.coords.longitude;
// }

// const GettingStartedGoogleMap = withGoogleMap(props => (
//     <GoogleMap
//         ref={props.onMapLoad}
//         defaultZoom={15}
//         defaultCenter={props.data.location}
//         onClick={props.onMapClick}
//     >
//         {props.markers.map((marker, index) => (
//             <Marker
//                 {...marker}
//                 onRightClick={() => props.onMarkerRightClick(index)}
//             />
//         ))}
//     </GoogleMap>
// ));
// // Then, render it:
// // render(
// //
// //     document.getElementById('root')
// // );
// //
//
// class Map extends Component{
//     state = {
//         location: {
//             lat:21.0320496,
//             lng: 105.8411168
//         }
//     }
//     render() {
//         var self = this;
//         navigator.geolocation.getCurrentPosition(function (location) {
//             console.log(location.coords.latitude+":"+location.coords.longitude)
//             self.setState(U(self.state, {location: {$set: {lat: location.coords.latitude, lng: location.coords.longitude}}}));
//         });
//         const mapContainer = <div style={{height: "100%", width: "100%"}}></div>;
//         const abc = [
//             {
//                 location: {
//                     lat: 21.0320496,
//                     lng: 105.8411168
//                 }
//             }
//         ]
//         const markers = abc.map((value, i) => {
//             const marker = {
//                 position: {
//                     lat: value.location.lat,
//                     lng: value.location.lng,
//                 }
//             }
//             return <Marker key={i} {...marker} />
//         });
//         // var aa = withGoogleMap(<GoogleMap defaultZoom={3}
//         //                 defaultCenter={this.props.center}
//         //                 options={{streetViewControl: false, mapTypeControl: false}}>
//         //     {markers}
//         // </GoogleMap>)
//         return (
//             <GettingStartedGoogleMap
//                 containerElement={
//                     <div style={{ height: `100%` }} />
//                 }
//                 mapElement={
//                     <div style={{ height: `100%` }} />
//                 }
//                 data={this.state}
//                 // onMapLoad={_.noop}
//                 // onMapClick={_.noop}
//                 markers={markers}
//                 // onMarkerRightClick={_.noop}
//             />
//             // <GoogleMapLoader containerElement = {mapContainer}
//             //                  googleMapElement={
//             //                      <GoogleMap defaultZoom={15}
//             //                                 defaultCenter={this.props.center}
//             //                                 options={{streetViewControl: false, mapTypeControl: false}}>
//             //                         {markers}
//             //                     </GoogleMap>}>
//             // </GoogleMapLoader>
//         )
//     }
// }

class Header extends Component {
    constructor(props){
        super(props);
    }
    scroll = () => {
        var self = this;
        $(window).scroll(function () {
            if ($(window).scrollTop() >= 50){
                self.$el.addClass("su--scroll");
            }else{
                self.$el.removeClass("su--scroll");
            }
        });
    }
    componentDidMount() {
        this.scroll();
    }
    render() {
        return (
            <header>
                <div className="su_header_main">
                    <a className="su_header_logo">Odoo</a>
                    <div className="su--header_button">
                        <a className="su--header_btn_sign">SIGN IN</a>
                        <a className="btn btn-primary">SIGN UP</a>
                    </div>
                    <ul className="su_header_nav">
                        <li><a className="active">HOME</a></li>
                        <li><a>AROUND</a></li>
                    </ul>
                </div>
                <div className="su_header_search">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-7 col-md-3 col-sm-4 col-lg-2 su--nav_btn_group">
                                <a className="su--nav_btn active"><i className="fa fa-cube"></i> APPS</a>
                                <a className="su--nav_btn"><i className="fa fa-paint-brush"></i> THEMES</a>
                            </div>
                            <div className="col-xs-5 col-sm-2 col-md-3 col-sm-push-6 col-lg-push-7 text-right su--nav_btn_group">
                                <a className="su--nav_btn" href="/apps/upload">
                                    <i className="fa fa-upload"></i> SUBMIT
                                </a>
                            </div>
                            <div className="clearfix visible-xs-block"></div>
                            <div className="col-sm-6 col-md-6 col-sm-pull-2 col-md-pull-3 col-lg-offset-1 su--search-container">
                                <div className="su--search-main">
                                    <input type="text" name="search" className="su--search-query form-control" placeholder="Your search..." />
                                        <span className="input-group-btn">
                                        <button type="submit" className="btn btn-link su--btn_search-main">
                                            <i className="fa fa-search" />
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
Header = Pp(Header)
class Main extends Component {
    constructor(props){
        super(props);
    }
    scroll = () => {
        var self = this;
        $(window).scroll(function () {
            var height = $(document).height();
            if ((height - $(window).scrollTop() - $(window).height()) < height/10){
                $(window).scrollTop = $(window).scrollTop() - height/10
                self.$el.find(".row").append("<div><h4>Hello</h4></div>")
            }
        });
    }
    componentDidMount() {
        // this.scroll();
    }
    render(){
        const location = {
            lat: 40.7575285,
            lng: -73.9884469
        }
        const markers = [
            {
                location: {
                    lat: 40.7575285,
                    lng: -73.9884469
                }
            }
        ]
            // <Map center={location} markers={markers} />
        return (
            <main>
                <div id="wrap">
                    <div className="container" style={{paddingTop: "188px"}}>
                        <div className="row" style={{height: "500px"}}>
                            <GoogleApiWrapper />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}
Main = Pp(Main)
class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <footer>
                <div className="su--footer-main container">
                    <span className="su--footer_logo center-block">Odoo</span>
                    <div className="row"></div>
                </div>
                <div className="su--footer-footer">
                    <div className="container">
                        <a className="small" href="/page/website-builder">Website made with <span className="">Odoo</span></a>
                        <div className="su--social_links pull-right">
                            <a><i className="fa fa-facebook"></i></a>
                            <a><i className="fa fa-twitter"></i></a>
                            <a><i className="fa fa-linkedin"></i></a>
                            <a><i className="fa fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

Footer = Pp(Footer)


class App extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div id="app" style={{paddingBottom: '510px'}}>
                <Header />
                <Main />
                <Footer />
            </div>
        );
        // return (
        //     <div id="app">
        //         <Header />
        //         <Main />
        //         <Footer />
        //     </div>
        // );
    }
}




module.exports = {App: App}
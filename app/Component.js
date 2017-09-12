import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server'
import c from './Component.less';
import { Pp } from './Base.js';
var U = require('react-addons-update');
// import {withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import GoogleMapLoader from "react-google-maps-loader"


import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const mapStyles = {
    container: {
        position: 'absolute',
        width: '97%',
        height: '97%'

    },
    map: {
        position: 'absolute',
        left: 1,
        right: 1,
        bottom: 1,
        top: 1
    }
};
// position: absolute;
// left: 0px;
// right: 0px;
// bottom: 0px;
// top: 0px;
// display: inherit;
// overflow: hidden;

//
// height: 100%;
// width: 100%;
// position: absolute;
// top: 0px;
// left: 0px;
// background-color: rgb(229, 227, 223);

var eventName = ["click", "rightclick"]

export class MyMarker extends Component {
    static propTypes = {
        position: PropTypes.object,
        map: PropTypes.object
    }
    static defaultProps = {

    }
    componentDidUpdate(prevProps){
        if ((prevProps.map !== this.props.map) || (this.props.position !== prevProps.position)){
            this.renderMarker();
        }
    }
    renderMarker = () => {
        let {map, google, position, mapCenter} = this.props;
        position = position || mapCenter;
        position = new google.maps.LatLng(position.lat, position.lng);
        const pref = {
            map: map, position: position, label: "label",
            title: "title",
        }
        this.marker = new google.maps.Marker(pref);
        eventName.forEach(e => {
            this.marker.addListener(e, this.handleEvent(e))
        })
        // google.maps.event.trigger(this.marker, 'onClick');
    }
    componentWillUnmount() {
        if (this.marker){
            this.marker.setMap(null);
        }
    }
    handleEvent = (evtName) => {
        return (e) => {
            if (this.props[evtName]){
                this.props[evtName](this.props, this.marker, e)
            }
        }
    }
    render() {
        return null;
    }
}

export class MapLA extends Component {
    static propTypes = {
        initialCenter: PropTypes.object,
        zoom: PropTypes.number,
        google: PropTypes.object,
        visible: PropTypes.bool,
    }
    static defaultProps = {
        visible: true,
        zoom: 14,
        initialCenter: {lat: 22.0320496, lng:105.8411168},
        onMove: function () {alert("a")}
    }
    constructor(props){
        super(props);
        const {lat, lng} = this.props.initialCenter;
        this.state = {currentLocation: {lat: lat, lng: lng}};
    }
    componentDidMount(){
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                console.log(coords);
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                })
            })
        }
        this.loadMap();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }
    recenterMap(){
        const map = this.map;
        const curr = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;
        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng);
            map.panTo(center);
        }
    }
    loadMap() {
        if (this.props && this.props.google) {
            // google is available
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let {initialCenter, zoom} = this.props;
            const {lat, lng} = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            })
            this.map = new maps.Map(node, mapConfig);
            this.map.addListener('dragend', (evt) => {
                this.props.onMove(this.map);
            })
            maps.event.trigger(this.map, 'ready');
        }
    }
    renderChildren() {
        const {children} = this.props;
        if (!children) return;
        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation,
                position: this.state.currentLocation,
            })
        })
    }
    render() {
        const style = Object.assign({}, mapStyles.map, this.props.style, {
            display: this.props.visible ? 'inherit' : 'none'
        });
        return (
            <div style={style} ref="map">
                Loading map...
                {this.renderChildren()}
            </div>
        )
    }
}

export class MyInfoWindow extends Component {
    componentDidUpdate(prevProps, prevState){
        if (this.props.map !== prevProps.map){
            this.renderInfoWindow();
        }
        if (this.props.position !== prevProps.position){
            this.updatePosition();
        }
        if (this.props.children != prevProps.children) {
            this.updateContent();
        }
    }
    updateContent() {
        const content = this.renderChildren();
        if (this.myInfoWindow){
            this.myInfoWindow.setContent(content);
            this.myInfoWindow.open(this.props.map, this.props.marker);
        }
    }
    onOpen(){
        // alert("on Open")
    }
    onClose(){
        // alert("on Close")
    }
    updatePosition(){
        let {position, google} = this.props;
        if (!(position instanceof google.maps.LatLng)){
            position = position && new google.maps.LatLng(position.lat, position.lng);
        }
        this.myInfoWindow.setPosition(position);
    }
    renderChildren(){
        const {children} = this.props;
        return ReactDOMServer.renderToString(children);
    }
    renderInfoWindow(){
        let {map, google, mapCenter} = this.props;
        if (!google || !google.maps){
            return;
        }
        const miw = this.myInfoWindow = new google.maps.InfoWindow({content: "hello"})

        google.maps.event.addListener(miw, 'closeclick', this.onClose.bind(this));
        google.maps.event.addListener(miw, 'domready', this.onOpen.bind(this));
    }
    render(){
        return null;
    }
}

export class MapContainer extends Component {
    constructor(props){
        super(props);
        this.state = {activeMarker: {}, selectedPlace: {}}
    }
    onMarkerClick = () => {
        alert("Marker");
    }
    onInfoWindowClose = () => {
        alert("close");
    }
    onRightClick = () => {
        alert("Right Click")
    }
    onClickMarker = (props, marker, e) => {
        this.setState(U(this.state, {activeMarker: {$set: props.marker}}))
    }
    onClickFindBtn = () => {
        // this.$el.find("#find_location").val()
        var geocoder = new this.props.google.maps.Geocoder()
        geocoder.geocode({'address': "Ha Noi"}, function(results, status) {
            // if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            alert(latitude);
            // }
        });
    }
    render() {
        const style = {width: '500px', height: '500px', position: 'relative'}
        return (
            <div id="ok" style={style} ref={(item) => {this.$el = $(item)}}>
                <input type="text" style={{position: "absolute", zIndex: 1000, left: "20px"}} id="find_location" />
                <button style={{position: "absolute", zIndex: 1000}} onClick={this.onClickFindBtn.bind(this)}>Find</button>
                <MapLA google={this.props.google}>
                    <MyMarker click={this.onClickMarker} rightclick={this.onRightClick} />
                    <MyInfoWindow marker={this.state.activeMarker}>
                        <h1>Hello</h1>
                    </MyInfoWindow>
                </MapLA>
            </div>
        );
    }
}


var OK = GoogleApiWrapper({
    apiKey: ('AIzaSyDQxjAooOjVtVXe88dfgSAlIAr0Z4M9JKo'),
    version: '3.25',
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
    // scroll = () => {
    //     var self = this;
    //     $(window).scroll(function () {
    //         var height = $(document).height();
    //         if ((height - $(window).scrollTop() - $(window).height()) < height/10){
    //             $(window).scrollTop = $(window).scrollTop() - height/10
    //             self.$el.find(".row").append("<div><h4>Hello</h4></div>")
    //         }
    //     });
    // }
    // componentDidMount() {
    //     // this.scroll();
    // }
    render(){
        // const location = {
        //     lat: 40.7575285,
        //     lng: -73.9884469
        // }
        // const markers = [
        //     {
        //         location: {
        //             lat: 40.7575285,
        //             lng: -73.9884469
        //         }
        //     }
        // ]
            // <Map center={location} markers={markers} />
        return (
            <main>
                <div id="wrap">
                    <div className="container" style={{paddingTop: "188px"}}>
                        <div className="row" style={{height: "500px"}}>
                            <OK />
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
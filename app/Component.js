import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server'
import c from './Component.less';
import { Register} from './Base.js';
import BASE from './Base.js';
var U = require('react-addons-update');
// import {withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import GoogleMapLoader from "react-google-maps-loader"
import xpath from 'xpath';
import dom from 'xmldom';


import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// const mapStyles = {
//     container: {
//         position: 'absolute',
//         width: '97%',
//         height: '97%'
//
//     },
//     map: {
//         position: 'absolute',
//         left: 1,
//         right: 1,
//         bottom: 1,
//         top: 1
//     }
// };
// // position: absolute;
// // left: 0px;
// // right: 0px;
// // bottom: 0px;
// // top: 0px;
// // display: inherit;
// // overflow: hidden;
//
// //
// // height: 100%;
// // width: 100%;
// // position: absolute;
// // top: 0px;
// // left: 0px;
// // background-color: rgb(229, 227, 223);
//
// var eventName = ["click", "rightclick"]
//
//
// @Register
// class MapSearch extends Component {
//     static propTypes = {
//         onClick: PropTypes.func
//     }
//     static defaultProps = {
//         onClick: () => {
//             return this.onClickFindLocation();
//         }
//     }
//     constructor(props){
//         super(props);
//         this.onClickFindLocation = this.onClickFindLocation.bind(this);
//     }
//     onClickFindLocation = () => {
//         // this.app.App.setState({chan: "UK CHAN"})
//         // this.setStoreState("Header1", "a", "234");
//         // setState('App', 'hello', 'Tao Chiu');
//         // this.app.App.alertOK();
//         // setState('Footer', 'footer', 'This is Footer');
//         // TEST.App.setState(U(TEST.App.state, {hello: {$set: "Nihao"}}));
//     }
//     render() {
//         return (
//             <div className="su--map_search" style={{position: "absolute", zIndex: 1000}}>
//                 <input type="text" placeholder="Find location..." />
//                 <button onClick={this.props.onClick}>Find</button>
//                 <button onClick={this.onClickFindLocation}>FindOK</button>
//             </div>
//         )
//     }
// }
//
//
// // class MapMarker extends Component {
// //     constructor(props) {
// //         super(props);
// //     }
// //     render() {
// //         return null;
// //     }
// // }
// //
// // MapMarker = Pp(MapMarker);
// //
// // class MapInfoWindow extends Component {
// //     constructor(props){
// //         super(props);
// //     }
// //     render() {
// //         return (
// //             <div class="su--map_info">
// //
// //             </div>
// //         )
// //     }
// // }
// //
// // MapInfoWindow = Pp(MapInfoWindow);
//
// // export class MapMap extends Component {
// //     static propTypes = {
// //         initialCenter: PropTypes.object,
// //         zoom: PropTypes.number,
// //         google: PropTypes.object,
// //         visible: PropTypes.bool,
// //     }
// //     static defaultProps = {
// //         visible: true,
// //         zoom: 14,
// //         initialCenter: {lat: 22.0320496, lng:105.8411168},
// //     }
// //     constructor(props){
// //         super(props);
// //         const {lat, lng} = this.props.initialCenter;
// //         this.state = {currentLocation: {lat: lat, lng: lng}};
// //     }
// //     componentDidMount(){
// //         if (navigator && navigator.geolocation) {
// //             navigator.geolocation.getCurrentPosition((pos) => {
// //                 const coords = pos.coords;
// //                 console.log(coords);
// //                 this.setState({
// //                     currentLocation: {
// //                         lat: coords.latitude,
// //                         lng: coords.longitude
// //                     }
// //                 })
// //             })
// //         }
// //         this.loadMap();
// //     }
// //     componentDidUpdate(prevProps, prevState) {
// //         if (prevProps.google !== this.props.google) {
// //             this.loadMap();
// //         }
// //         if (prevState.currentLocation !== this.state.currentLocation || prevProps.position !== this.props.position) {
// //             this.recenterMap();
// //         }
// //     }
// //     recenterMap(){
// //         const map = this.map;
// //         const curr = this.state.currentLocation;
// //
// //         const google = this.props.google;
// //         const maps = google.maps;
// //         if (map) {
// //             let center = new maps.LatLng(curr.lat, curr.lng);
// //             map.panTo(center);
// //         }
// //     }
// //     loadMap() {
// //         if (this.props && this.props.google) {
// //             // google is available
// //             const {google} = this.props;
// //             const maps = google.maps;
// //
// //             const mapRef = this.refs.map;
// //             const node = ReactDOM.findDOMNode(mapRef);
// //
// //             let {initialCenter, zoom} = this.props;
// //             const {lat, lng} = this.state.currentLocation;
// //             const center = new maps.LatLng(lat, lng);
// //             const mapConfig = Object.assign({}, {
// //                 center: center,
// //                 zoom: zoom
// //             })
// //             this.map = new maps.Map(node, mapConfig);
// //
// //             // maps.event.trigger(this.map, 'ready');
// //         }
// //     }
// //     renderChildren() {
// //         const {children} = this.props;
// //         if (!children) return;
// //         return React.Children.map(children, c => {
// //             return React.cloneElement(c, {
// //                 map: this.map,
// //                 google: this.props.google,
// //                 mapCenter: this.state.currentLocation,
// //                 position: this.state.currentLocation,
// //             })
// //         })
// //     }
// //     onClickFindBtn = () => {
// //         // this.$el.find("#find_location").val()
// //         var self = this;
// //         var geocoder = new this.props.google.maps.Geocoder()
// //         geocoder.geocode({'address': this.$el.find("#find_location").val()}, function(results, status) {
// //             var latitude = results[0].geometry.location.lat();
// //             var longitude = results[0].geometry.location.lng();
// //             self.setState(U(self.state, {currentLocation: {$set: {lat: latitude,lng: longitude}}}));
// //             console.log(results)
// //         });
// //     }
// //     render() {
// //         const style = Object.assign({}, mapStyles.map, this.props.style, {
// //             display: this.props.visible ? 'inherit' : 'none'
// //         });
// //         return (
// //             <div id="map_container" ref={(item) => {this.$el = $(item)}}>
// //                 <input type="text" style={{position: "absolute", zIndex: 1000, left: "20px"}} id="find_location" />
// //                 <button style={{position: "absolute", zIndex: 1000}} onClick={this.onClickFindBtn.bind(this)}>Find</button>
// //                 <div style={style} ref="map">
// //                     Loading map...
// //                     {this.renderChildren()}
// //                 </div>
// //             </div>
// //         )
// //     }
// // }
//
// // MapMap = Pp(MapMap);
//
// // class MapContainer extends Component {
// //     constructor(props){
// //         super(props);
// //     }
// //     render() {
// //         return (
// //             <div id="su--map_container">
// //                 <MapMap>
// //                     <MapSearch />
// //                     <MapMarker></MapMarker>
// //                     <MapInfoWindow></MapInfoWindow>
// //                 </MapMap>
// //             </div>
// //         )
// //     }
// // }
// //
// // MapContainer = Pp(MapContainer);
//
//
//
//
// @Register
// export class MyMarker extends Component {
//     static propTypes = {
//         position: PropTypes.object,
//         map: PropTypes.object
//     }
//     static defaultProps = {
//
//     }
//     componentDidUpdate(prevProps){
//         if ((prevProps.map !== this.props.map) || (this.props.position !== prevProps.position)){
//             this.renderMarker();
//         }
//     }
//     renderMarker = () => {
//         if (this.marker){
//             this.marker.setMap(null);
//         }
//         let {map, google, position, mapCenter} = this.props;
//         position = position || mapCenter;
//         position = new google.maps.LatLng(position.lat, position.lng);
//         const pref = {
//             map: map,
//             position: position
//         }
//         this.marker = new google.maps.Marker(pref);
//         eventName.forEach(e => {
//             this.marker.addListener(e, this.handleEvent(e))
//         })
//         // google.maps.event.trigger(this.marker, 'onClick');
//     }
//     componentWillUnmount() {
//         if (this.marker){
//             this.marker.setMap(null);
//         }
//     }
//     handleEvent = (evtName) => {
//         return (e) => {
//             if (this.props[evtName]){
//                 this.props[evtName](this.props, this.marker, e)
//             }
//         }
//     }
//     render() {
//         return null;
//     }
// }
//
//
// @Register
// export class MapLA extends Component {
//     static propTypes = {
//         initialCenter: PropTypes.object,
//         zoom: PropTypes.number,
//         google: PropTypes.object,
//         visible: PropTypes.bool,
//     }
//     static defaultProps = {
//         visible: true,
//         zoom: 14,
//         initialCenter: {lat: 22.0320496, lng:105.8411168},
//     }
//     constructor(props){
//         super(props);
//         const {lat, lng} = this.props.initialCenter;
//         this.state = {currentLocation: {lat: lat, lng: lng}};
//     }
//     componentDidMount(){
//         if (navigator && navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition((pos) => {
//                 const coords = pos.coords;
//                 console.log(coords);
//                 this.setState({
//                     currentLocation: {
//                         lat: coords.latitude,
//                         lng: coords.longitude
//                     }
//                 })
//             })
//         }
//         this.loadMap();
//     }
//     componentDidUpdate(prevProps, prevState) {
//         if (prevProps.google !== this.props.google) {
//             this.loadMap();
//         }
//         if (prevState.currentLocation !== this.state.currentLocation || prevProps.position !== this.props.position) {
//             this.recenterMap();
//         }
//     }
//     recenterMap(){
//         const map = this.map;
//         const curr = this.state.currentLocation;
//
//         const google = this.props.google;
//         const maps = google.maps;
//         if (map) {
//             let center = new maps.LatLng(curr.lat, curr.lng);
//             map.panTo(center);
//         }
//     }
//     loadMap() {
//         if (this.props && this.props.google) {
//             // google is available
//             const {google} = this.props;
//             const maps = google.maps;
//
//             const mapRef = this.refs.map;
//             const node = ReactDOM.findDOMNode(mapRef);
//
//             let {initialCenter, zoom} = this.props;
//             const {lat, lng} = this.state.currentLocation;
//             const center = new maps.LatLng(lat, lng);
//             const mapConfig = Object.assign({}, {
//                 center: center,
//                 zoom: zoom
//             })
//             this.map = new maps.Map(node, mapConfig);
//
//             // maps.event.trigger(this.map, 'ready');
//         }
//     }
//     renderChildren() {
//         const {children} = this.props;
//         if (!children) return;
//         return React.Children.map(children, c => {
//             return React.cloneElement(c, {
//                 map: this.map,
//                 google: this.props.google,
//                 mapCenter: this.state.currentLocation,
//                 position: this.state.currentLocation,
//             })
//         })
//     }
//     onClickFindBtn = () => {
//         // this.$el.find("#find_location").val()
//         var self = this;
//         var geocoder = new this.props.google.maps.Geocoder()
//         geocoder.geocode({'address': this.$el.find("#find_location").val()}, function(results, status) {
//             var latitude = results[0].geometry.location.lat();
//             var longitude = results[0].geometry.location.lng();
//             self.setState(U(self.state, {currentLocation: {$set: {lat: latitude,lng: longitude}}}));
//             console.log(results)
//         });
//     }
//     render() {
//         const style = Object.assign({}, mapStyles.map, this.props.style, {
//             display: this.props.visible ? 'inherit' : 'none'
//         });
//         {/*<input type="text" style={{position: "absolute", zIndex: 1000, left: "20px"}} id="find_location" />*/}
//         {/*<button style={{position: "absolute", zIndex: 1000}} onClick={this.onClickFindBtn.bind(this)}>Find</button>*/}
//         return (
//             <div id="map_container" style={{display: "flex", flex: 1, position: "relative", height: "100%"}} ref={(item) => {this.$el = $(item)}}>
//                 <div style={{width: "70%", position: "relative"}}>
//                     <div style={style} ref="map">
//                         Loading map...
//                     </div>
//                 </div>
//                 <div style={{width: "30%", paddingLeft: "10px"}}>
//                     <div>
//
//                     </div>
//                     {this.renderChildren()}
//                 </div>
//             </div>
//         )
//     }
// }
//
//
//
// @Register
// export class MyInfoWindow extends Component {
//     componentDidUpdate(prevProps, prevState){
//         if (this.props.map !== prevProps.map){
//             this.renderInfoWindow();
//         }
//         if (this.props.position !== prevProps.position){
//             this.updatePosition();
//         }
//         if (this.props.children != prevProps.children) {
//             this.updateContent();
//         }
//     }
//     updateContent() {
//         const content = this.renderChildren();
//         if (this.myInfoWindow){
//             this.myInfoWindow.setContent(content);
//             this.myInfoWindow.open(this.props.map, this.props.marker);
//         }
//     }
//     onOpen(){
//         // alert("on Open")
//     }
//     onClose(){
//         // alert("on Close")
//     }
//     updatePosition(){
//         let {position, google} = this.props;
//         if (!(position instanceof google.maps.LatLng)){
//             position = position && new google.maps.LatLng(position.lat, position.lng);
//         }
//         this.myInfoWindow.setPosition(position);
//     }
//     renderChildren(){
//         const {children} = this.props;
//         return ReactDOMServer.renderToString(children);
//     }
//     renderInfoWindow(){
//         let {map, google, mapCenter} = this.props;
//         if (!google || !google.maps){
//             return;
//         }
//         const miw = this.myInfoWindow = new google.maps.InfoWindow({content: "hello"})
//
//         google.maps.event.addListener(miw, 'closeclick', this.onClose.bind(this));
//         google.maps.event.addListener(miw, 'domready', this.onOpen.bind(this));
//     }
//     render(){
//         return null;
//     }
// }
//
//
// @Register
// export class MarkerInfo extends Component {
//     constructor(props){
//         super(props);
//     }
//     render() {
//         return (
//             <div className="su--map_marker_info" style={{background: "white", height: "100%"}}>
//                 <div>
//                     <div class="su--map_marker_banner">
//                         <img style={{width: "100%"}} src="https://lh5.googleusercontent.com/p/AF1QipOkMq-JOxN4UdWfnDD8iO3HBfo6l0BaV9VH0RQ=w408-h270-k-no"/>
//                     </div>
//                     <div style={{width: "100%", height: "70px", backgroundColor: "#282F33"}}>
//
//                     </div>
//                 </div>
//                 <div>
//                     <div>
//                         <ul style={{listStyle: "none", padding: "10px 0px"}}>
//                             <li style={{padding: "3px 0px"}}><i style={{fontSize: "28px", marginRight: "5px"}} className="fa fa-map-marker" aria-hidden="true" /> Ngõ 28B Điện Biên Phủ, Điện Biên, Hà Nội, Việt Nam</li>
//                             <li style={{padding: "3px 0px"}}><i style={{fontSize: "28px", marginRight: "5px"}} className="fa fa-globe" aria-hidden="true" />moonwork.com.vn</li>
//                             <li style={{padding: "3px 0px"}}><i style={{fontSize: "28px", marginRight: "5px"}} className="fa fa-phone" aria-hidden="true" />+84 432444207</li>
//                             <li style={{padding: "3px 0px"}}><i style={{fontSize: "28px", marginRight: "5px"}} className="fa fa-clock-o" aria-hidden="true" />Hiện đang mở cửa: 08:30-21:00</li>
//                             <li style={{padding: "3px 0px"}}><i style={{fontSize: "28px", marginRight: "5px"}} className="fa fa-check-circle" aria-hidden="true" />Xác nhận doanh nghiệp này</li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div>
//                     <div>
//                         <button className="btn btn-primary">Order Now !</button>
//                         <button className="btn btn-default">View More</button>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
//
//
// @Register
// export class MapContainer extends Component {
//     constructor(props){
//         super(props);
//         this.state = {activeMarker: {}, selectedPlace: {}}
//     }
//     onMarkerClick = () => {
//         alert("Marker");
//     }
//     onInfoWindowClose = () => {
//         alert("close");
//     }
//     onRightClick = () => {
//         alert("Right Click")
//     }
//     onClickMarker = (props, marker, e) => {
//         this.setState(U(this.state, {activeMarker: {$set: props.marker}}))
//     }
//     onClickFindBtn = () => {
//         // this.$el.find("#find_location").val()
//         var geocoder = new this.props.google.maps.Geocoder()
//         geocoder.geocode({'address': "Ha Noi"}, function(results, status) {
//             // if (status == google.maps.GeocoderStatus.OK) {
//             var latitude = results[0].geometry.location.lat();
//             var longitude = results[0].geometry.location.lng();
//             alert(latitude);
//             // }
//         });
//     }
//     render() {
//         const style = {width: '100%', height: '500px', position: 'relative'}
//         return (
//             <div id="ok" style={style} ref={(item) => {this.$el = $(item)}}>
//                 {/*<Map centerAroundCurrentLocation={true} clickableIcons={true} google={this.props.google}>*/}
//                     {/*<Marker/>*/}
//                     {/*<InfoWindow marker={this.state.activeMarker}>*/}
//                         {/*<h1>Hello</h1>*/}
//                     {/*</InfoWindow>*/}
//                 {/*</Map>*/}
//                  <MapLA google={this.props.google}>
//                      <MapSearch/><MyMarker click={this.onClickMarker} rightclick={this.onRightClick} />
//                      <MyInfoWindow marker={this.state.activeMarker}>
//                          <h1>Hello</h1>
//                      </MyInfoWindow>
//                      <MarkerInfo />
//                  </MapLA>
//             </div>
//         );
//     }
// }
//
//
// var OK = Register(GoogleApiWrapper({
//     apiKey: ('AIzaSyDQxjAooOjVtVXe88dfgSAlIAr0Z4M9JKo'),
//     version: '3.25',
// })(MapContainer))
//
// //
// // var x = document.getElementById("demo");
// //
// // function getLocation() {
// //     if (navigator.geolocation) {
// //         navigator.geolocation.getCurrentPosition(showPosition);
// //     } else {
// //         x.innerHTML = "Geolocation is not supported by this browser.";
// //     }
// // }
// //
// // function showPosition(position) {
// //     x.innerHTML = "Latitude: " + position.coords.latitude +
// //         "<br>Longitude: " + position.coords.longitude;
// // }
//
// // const GettingStartedGoogleMap = withGoogleMap(props => (
// //     <GoogleMap
// //         ref={props.onMapLoad}
// //         defaultZoom={15}
// //         defaultCenter={props.data.location}
// //         onClick={props.onMapClick}
// //     >
// //         {props.markers.map((marker, index) => (
// //             <Marker
// //                 {...marker}
// //                 onRightClick={() => props.onMarkerRightClick(index)}
// //             />
// //         ))}
// //     </GoogleMap>
// // ));
// // // Then, render it:
// // // render(
// // //
// // //     document.getElementById('root')
// // // );
// // //
// //
// // class Map extends Component{
// //     state = {
// //         location: {
// //             lat:21.0320496,
// //             lng: 105.8411168
// //         }
// //     }
// //     render() {
// //         var self = this;
// //         navigator.geolocation.getCurrentPosition(function (location) {
// //             console.log(location.coords.latitude+":"+location.coords.longitude)
// //             self.setState(U(self.state, {location: {$set: {lat: location.coords.latitude, lng: location.coords.longitude}}}));
// //         });
// //         const mapContainer = <div style={{height: "100%", width: "100%"}}></div>;
// //         const abc = [
// //             {
// //                 location: {
// //                     lat: 21.0320496,
// //                     lng: 105.8411168
// //                 }
// //             }
// //         ]
// //         const markers = abc.map((value, i) => {
// //             const marker = {
// //                 position: {
// //                     lat: value.location.lat,
// //                     lng: value.location.lng,
// //                 }
// //             }
// //             return <Marker key={i} {...marker} />
// //         });
// //         // var aa = withGoogleMap(<GoogleMap defaultZoom={3}
// //         //                 defaultCenter={this.props.center}
// //         //                 options={{streetViewControl: false, mapTypeControl: false}}>
// //         //     {markers}
// //         // </GoogleMap>)
// //         return (
// //             <GettingStartedGoogleMap
// //                 containerElement={
// //                     <div style={{ height: `100%` }} />
// //                 }
// //                 mapElement={
// //                     <div style={{ height: `100%` }} />
// //                 }
// //                 data={this.state}
// //                 // onMapLoad={_.noop}
// //                 // onMapClick={_.noop}
// //                 markers={markers}
// //                 // onMarkerRightClick={_.noop}
// //             />
// //             // <GoogleMapLoader containerElement = {mapContainer}
// //             //                  googleMapElement={
// //             //                      <GoogleMap defaultZoom={15}
// //             //                                 defaultCenter={this.props.center}
// //             //                                 options={{streetViewControl: false, mapTypeControl: false}}>
// //             //                         {markers}
// //             //                     </GoogleMap>}>
// //             // </GoogleMapLoader>
// //         )
// //     }
// // }
//
class GroupInput extends Component {
    static propTypes = {
        children: PropTypes.element
    }
    static defaultProps = {
        children: <div>Nothing</div>
    }
    constructor (props){
        super(props);
    }
    render () {
        return (
            <div className={"form-group"}>
                {this.props.children}
            </div>
        )
    }
}

class Input extends Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        type: PropTypes.string,
        placeholder: PropTypes.string,
        label: PropTypes.string,
    }
    static defaultProps = {
        name: "input",
        value: "",
        type: "input",
        placeholder: "...",
        label: "Input"
    }
    constructor (props) {
        super(props)
    }
    render () {
        const { name, value, type, placeholder, label } = this.props;
        return (
            <div className="form-group">
                <label>{label}</label>
                <input name={name}
                       defaultValue={value}
                       type={type}
                       placeholder={placeholder}
                       className="form-control" />
            </div>
        )
    }
}

class SignInForm extends Component {
    static propTypes = {

    }
    static defaultProps = {

    }
    constructor (props) {
        super(props);
        this.state = {open: false};
    }
    render () {
        return (
            <div className="sign_in">
                <div className="row">
                    <h1>SignIn Form</h1>
                    <Input placeholder="user name..."
                           label={"UserName"}/>
                    <Input type="password"
                           label={"Password"}
                           placeholder="password" />
                    <Input type="password"
                           placeholder="password confirm"
                           label={"Confirm"}/>
                </div>
                <div className="row">
                    <Button string={"Login"} onClick={() => alert("Login success!")} />
                </div>
            </div>
        )
    }
}

class User extends Object{
    constructor (props) {
        super(props)
        var { id, username, password } = props;
        this.id = id;
        this.username = username;
        this.password = password;
    }
}

// var user = new User();


class SignUpForm extends Component {
    static propTypes = {

    }
    static defaultProps = {

    }
    constructor (props) {
        super(props);
        // this.user = user;
        this.state = {open: false};
    }
    render () {
        return (
            <div className="sign_in">
                <div className="row">
                    <h1>Sign Up Form</h1>
                    <Input placeholder="user name..."
                           label={"UserName"}/>
                    <Input type="password"
                           label={"Password"}
                           placeholder="password" />
                    <Input type="password"
                           placeholder="password confirm"
                           label={"Confirm"}/>
                </div>
                <div className="row">
                    <Button string={"Login"} onClick={() => alert("Sign Up success!")} />
                </div>
            </div>
        )
    }
}

class BtnGroup extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div className="su--header_button">
                {this.props.children}
            </div>
        )
    }
}

class Button extends Component {
    static propTypes = {
        string: PropTypes.string,
        name: PropTypes.string,
        onClick: PropTypes.func,
        type: PropTypes.string,
        fontWeight: PropTypes.bool
    }
    static defaultProps = {
        string: "Button",
        name: "btn",
        onClick: () => {alert("clicked!.")},
        type: "primary",
        fontWeight: true
    }
    constructor (props) {
        super(props);
    }
    onClick = () => {
        this.props.onClick();
    }
    render () {
        const { string, name, type, fontWeight } = this.props;
        return (
            <button name={name} onClick={this.onClick} className={`btn btn-${type}`}>
                {fontWeight
                    ? <strong>{string}</strong>
                    : {string}
                }
            </button>
        )
    }
}

class MenuItem extends Component {
    static propTypes = {
        name: PropTypes.string,
        active: PropTypes.bool,
        label: PropTypes.string,
        onClickItem: PropTypes.func
    }
    static defaultProps = {
        name: "na",
        active: false,
        label: "N/A",
        onClickItem: () => {}
    }
    constructor (props) {
        super (props);

    }
    onClick = (e) => {
        if (!this.props.active){
            this.props.onClickItem();
        }
    }
    render () {
        const {name, active, label} = this.props;
        return (
            <li onClick={this.onClick} name={name}>
                <a className={active}>{label}</a>
            </li>
        )
    }
}

@Register
class Menu extends Component {
    static propTypes = {
        menus: PropTypes.object,
        curItem: PropTypes.string,
    }
    static defaultProps = {
        menus: {redux: {label: "Redux", name: "redux"}, pure: {label: "Pure", name: "pure"}},
        curItem: "redux",
    }
    constructor (props) {
        super(props);
        const {menus, curItem, prevItem} = props;
        this.prevItem = null;
        this.state = {curItem: curItem};
    }
    verifyItemName = (itemName) => {
        if (!this.menus.hasOwnProperty(itemName)){
            alert(`Item Name ${itemName} not in Menu, pls check again`);
            return false;
        }
        return true;
    }
    __setPrevItem = () => {
        this.prevItem = this.state.curItem;
    }
    onClickItem = (itemName) => {
        this.__setPrevItem();
        this.setState({curItem: itemName});
        this.setStoreState("MainContainer", "curItem", itemName);
    }
    render () {
        const { menus } = this.props;
        const menuItem = Object.keys(menus).map((k) =>
            <MenuItem key={k}
                      active={k == this.state.curItem ? "active": ""}
                      {...menus[k]}
                      onClickItem={() => this.onClickItem(k)} />
        );
        return (
            <ul className="su_header_nav">
                {menuItem}
            </ul>
        )
    }
}

@Register
class SearchView extends Component {
    static propTypes = {
        placeholder: PropTypes.string,
        value: PropTypes.string,
        onClick: PropTypes.func,
        onChange: PropTypes.func
    }
    static defaultProps = {
        placeholder: "Search here!",
        value: "",
        onClick: () => {alert("nothing")},
        onChange: (e) => {alert("text change")},
    }
    constructor (props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.value = this.props.value;
    }
    onChange = (e) => {
        this.value = e.target.value;
        this.props.onChange(this.value)
    }
    onClick = () => {
        this.props.onClick(this.value);
    }
    render () {
        const { value, placeholder } = this.props;
        return (
            <div className="su--search-main">
                <input type="text"
                       name="search" className="su--search-query form-control"
                       defaultValue={value}
                       placeholder={placeholder} onChange={this.onChange} />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-link su--btn_search-main"
                            onClick={this.onClick}>
                        <i className="fa fa-search" />
                    </button>
                </span>
            </div>
        )
    }
}

@Register
class Logo extends Component {
    static propTypes = {
        href: PropTypes.string,
        image: PropTypes.string,
        label: PropTypes.string,
    }
    static defaultProps = {
        href: null,
        image: null,
        label: "NOTHING"
    }
    constructor (props){
        super(props);
    }
    render () {
        const { href, image, label } = this.props;
        return (
            <a href={href} className="su_header_logo">
                {image ? <image src={image} />: label}
            </a>
        )
    }
}

class ActionScroll extends Component {
    static propTypes = {

    }
    constructor (props){
        super(props)
    }
    render () {
        return null;
    }
}

@Register
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
    onClickBtnSignIn = (itemName) => {
        this.setStoreState("MainContainer", "curItem", "sign_in");
    }
    onClickBtnSignOut = (itemName) => {
        this.setStoreState("MainContainer", "curItem", "sign_up");
    }
    onClickBtnSearch = (data) => {
        this.setStoreState("MainContainer", "curItem", "search_result");
    }
    onChangeSearch = (data) => {
        this.setStoreState("MainContainer", "curItem", "search_result");
    }
    renderHeader() {
        const html = <div className="su_header_main header">
                        <Logo label={"ReactJS"} />
                        <BtnGroup>
                            <Button name="sign_in"
                                    type="transparent"
                                    string="SIGN IN"
                                    onClick={this.onClickBtnSignIn} />
                            <Button name="sign_up"
                                    string="SIGN UP"
                                    onClick={this.onClickBtnSignOut}/>
                        </BtnGroup>
                        <Menu />
                    </div>
        return html;
    }
    renderMain () {
        return null
    }
    renderFooter() {
        const html = <div className="su_header_search">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-7 col-md-3 col-sm-4
                                                col-lg-2 su--nav_btn_group">
                                </div>
                                <div className="col-xs-5 col-sm-2 col-md-3 col-sm-push-6
                                                col-lg-push-7 text-right su--nav_btn_group">
                                </div>
                                <div className="clearfix visible-xs-block"></div>
                                <div className="col-sm-6 col-md-6 col-sm-pull-2 col-md-pull-3
                                                col-lg-offset-1 su--search-container">
                                    <SearchView onChange={this.onChangeSearch}
                                                onClick={this.onClickBtnSearch} />
                                </div>
                            </div>
                        </div>
                    </div>
        return html;
    }
    render() {
        return (
            <header>
                {this.renderHeader()}
                {this.renderMain()}
                {this.renderFooter()}
            </header>
        );
    }
}

class ContainerBase extends Component {
    constructor (props) {
        super(props);
        this.name = "NAA"
    }
    overwrite = (name) => {
        return this[name]()
    }
    alertt = () => {
        alert("OK");
    }
    render () {
        return (
            <div></div>
        )
    }
}

@Register
class HomeContainer extends ContainerBase {
    constructor (props) {
        super(props);
    }
    alertt = () => {

    }
    render () {
        this.alertt();
        return (
            <div>
                <h1>REDUX</h1>
            </div>
        )
    }
}

@Register
class AroundContainer extends ContainerBase {
    render () {
        return (
            <div><h1>PURE</h1></div>
        )
    }
}

class SearchContainer extends ContainerBase {
    render () {
        return (
            <div>Search Result: </div>
        )
    }
}

@Register
class MainContainer extends ContainerBase {
    constructor (props) {
        super(props);
        this.form = {redux: <HomeContainer />,
                     pure: <AroundContainer />,
                     sign_in: <SignInForm />,
                     sign_up: <SignUpForm/>,
                     search_result: <SearchContainer/> };
        this.state = {curItem: "redux"};
    }
    render () {
        return (
            <div className="container" style={{paddingTop: "188px", paddingBottom: "100px"}}>
                <div className="row">
                    {this.form[this.state.curItem]}
                </div>
            </div>
        )
    }
}

@Register
class Main extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <main>
                <div id="wrap">
                    <MainContainer />
                </div>
            </main>
        );
    }
}

class GroupSocial extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    }
    static defaultProps = {
        children: null,
    }
    render () {
        return (
            <div className="su--social_links pull-right">
                {this.props.children}
            </div>
        )
    }
}

@Register
class SocialComponent extends Component {
    static propTypes = {
        icon: PropTypes.string,
        onClick: PropTypes.func
    }
    static defaultProps = {
        icon: "facebook",
        onClick: () => {alert("Clicked!")}
    }
    constructor(props){
        super(props);
    }
    onClick = (e) => {
        this.props.onClick()
    }
    render() {
        const { icon } = this.props;
        return (
            <a onClick={this.onClick}>
                <i className={`fa fa-${icon}`}></i>
            </a>
        )
    }
}

class Link extends Component {
    static propTypes = {
        href: PropTypes.string,
        string: PropTypes.string,
        title: PropTypes.string,
    }
    static defaultProps = {
        href: "/page/website-builder",
        string: "Website made with",
        title: "ReactJS",
    }
    constructor (props) {
        super(props);
    }
    render () {
        const { href, string, title } = this.props;
        return (
            <a className="small" href={href}>
                {string} <span className="">{title}</span>
            </a>
        )
    }
}

@Register
class Footer extends Component {
    constructor(props) {
        super(props);
    }
    renderHeader = () => {
        const html = <div className="su--footer-main container">
                        <span className="su--footer_logo center-block">ReactJS</span>
                        <div className="row"></div>
                    </div>;
        return html;
    }
    renderFooter = () => {
        const html = <div className="su--footer-footer">
                        <div className="container">
                            <Link />
                            <GroupSocial>
                                <SocialComponent icon={"facebook"} />
                                <SocialComponent icon={"twitter"} />
                                <SocialComponent icon={"linkedin"} />
                                <SocialComponent icon={"envelope"} />
                            </GroupSocial>
                        </div>
                    </div>;
        return html;
    }
    render() {
        return (
            <footer>
                {this.renderHeader()}
                {this.renderFooter()}
            </footer>
        )
    }
}

@Register
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
    }
}


module.exports = {App: App}

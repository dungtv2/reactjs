/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const router = express.Router();
var mongoose = require('mongoose')
// var Schema = mongoose.Schema, ObjectId = Schema.ObjectId
// var connect = mongoose.connect("mongodb://localhost:27018/mydatabase")
//
// var Xixi = connect.model('news', new Schema({}))
//
// mongoose.connection.on('connected', function () {
//     console.log('Mongoose default connection open to ');
// });
//
// // If the connection throws an error
// mongoose.connection.on('error',function (err) {
//     console.log('Mongoose default connection error: ');
// });
//
// // When the connection is disconnected
// mongoose.connection.on('disconnected', function () {
//     console.log('Mongoose default connection disconnected');
// });
app.use("/static", express.static('app'))
if (isDeveloping) {
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: 'src',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.get('/web', function response(req, res) {
        // res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
        // res.end();
        console.info("ABCCCCCCCCC")
        res.send("HELLO");
    });
    // app.get('/list', function (req, res, next){
    //     console.log("bi")
    //     res.send("bibi")
    //     // Xixi.find({}, function(err, result){
    //     //     if (err) throw err
    //     //     res.send(result)
    //     //     next()
    //     // });
    //     // next('route')
    //     next()
    //     console.log("hihi")
    // });
    // app.get('/list/:id', function (req, res, next) {
    //     console.log(req['params']['id'])
    //     res.end('mimi')
    //     next()
    // });
    // app.get('/list', function (req, res, next) {
    //     console.log("la")
    //     res.end('lalalala')
    //     next()
    // });
    // app.get('/list', function (err, req, res, next) {
    //     res.status(500).send('Something broke!')
    // });
    // app.use(function (err, req, res, next){
    //     console.error(err.stack)
    //     res.status(500).send('Something broke!')
    // });
} else {
    app.use(express.static(__dirname + '/dist'));
    // app.get('/web', function response(req, res) {
    //     res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    //     // res.end();
    //     console.info("ABCCCCCCCCC")
    //     res.send("HELLO");
    // });
    app.get('*', function response(req, res) {
        console.info("AHIHIIIIIIIIIIIIII")
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    });
}

app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

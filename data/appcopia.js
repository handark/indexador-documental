var appjs = require('appjs'),
    express = require('express')
    , routes = require('./routes');

// Setup express
var expressApp = express.createServer();
expressApp.set('views', __dirname + '/views');
expressApp.use(express.bodyParser());
expressApp.use(expressApp.router);
expressApp.use(express.static(__dirname + '/public'));
expressApp.register('jade', require('jade').express);
expressApp.use(express.errorHandler());

/*expressApp.get('/', function(req, res, next) {
    res.render('index.jade', { layout: true });
});*/
//expressApp.get('/', routes.index);

// Override AppJS's built in request handler
appjs.serveFilesFrom(__dirname + '/content');
appjs.router.handle = function(req) {
    req.originalUrl = req.url;
    req.url = req.pathname;
    expressApp.handle.apply(expressApp, arguments);
};



var mainWindow = appjs.createWindow({
    width: 640,
    height: 480
});

mainWindow.on('create', function() {
    console.log('mainWindow :: create');
    mainWindow.frame.show();
    mainWindow.frame.center();
    mainWindow.frame.openDevTools();
});

mainWindow.on('ready', function() {
    console.log('mainWindow :: ready');
    mainWindow.module = module;
    mainWindow.process = process;
    mainWindow.require = require;
});

mainWindow.on('close', function() {
    console.log('mainWindow :: close');
});
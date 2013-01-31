
/**
 * Indexador Documental ©2013 Afianzamiento Solidario SAS
 * Autor: Jose Luis Orozco - http://joseorozcomejia.com - handark@gmail.com
 */

var express = require('express'),
    appjs = require('appjs'),
    routes = require('./routes'),
    utils = require('util')
;

var app = module.exports = express.createServer();

// Configuracion
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Rutas
app.get('/', routes.index);
app.get('/video', routes.video);

/**
 * Escucha peticiones http
 */
app.listen(3005, function(){
  console.log("Servidor de Express iniciado por el puerto %d en modo %s", app.address().port, app.settings.env);
});


/**
 * Configuracion de AppJS
 */
appjs.router.handle = app.handle.bind(app);

var menubar = appjs.createMenu([{
  label:'&File',
  submenu:[
    {
      label:'E&xit',
      action: function(){
        window.close();
      }
    }
  ]
},{
  label:'&Ventana',
  submenu:[
    {
      label:'Pantalla Completa',
      action:function(item) {
        window.frame.fullscreen();
        console.log(item.label+" called.");
      }
    },
    {
      label:'Minimizar',
      action:function(){
        window.frame.minimize();
      }
    },
    {
      label:'Maximizar',
      action:function(){
        window.frame.maximize();
      }
    },{
      label:''//separator
    },{
      label:'Restaurar',
      action:function(){
        window.frame.restore();
      }
    }
  ]
}]);

menubar.on('select',function(item){
  console.log("menu item "+item.label+" clicked");
});

var trayMenu = appjs.createMenu([{
  label:'Mostrar',
  action:function(){
    window.frame.show();
  },
},{
  label:'Minimizar',
  action:function(){
    window.frame.hide();
  }
},{
  label:'Salir',
  action:function(){
    window.close();
  }
}]);

var statusIcon = appjs.createStatusIcon({
  icon:'./data/public/icons/32.png',
  tooltip:'Indexador Documental',
  menu:trayMenu
});

var window = appjs.createWindow({
  width : 640,
  height: 460,
  url: 'http://localhost:3005/',
  icons  : __dirname + '/public/icons'
});

window.on('create', function(){
  window.frame.show();
  //window.frame.center();
  window.frame.maximize();
  window.frame.setMenuBar(menubar);
  //window.frame.openDevTools();
});

window.on('ready', function(){
  window.require = require;
  window.process = process;
  window.module = module;
  window.addEventListener('keydown', function(e){
    if (e.keyIdentifier === 'F5') {
      window.frame.openDevTools();
    }
  });
});

window.on('close', function(){
  console.log("Window Closed");
});
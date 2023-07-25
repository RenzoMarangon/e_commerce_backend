const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
const socketController = require('../sockets/controller');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);


        this.paths = 
        {
            user     : '/api/user',
            auth     : '/api/auth',
            search   : '/api/search',
            upload   : '/api/upload',
            category : '/api/category',
            product  : '/api/product',
            order  : '/api/order',
        }

        //Conectar a DB
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();

        //Socket.io
        this.sockets();
    }

    routes(){

      this.app.use( this.paths.auth, require('../routes/auth') );
      this.app.use( this.paths.search, require('../routes/search') );
      this.app.use( this.paths.upload, require('../routes/upload') );
      this.app.use( this.paths.user, require('../routes/user') );
      this.app.use( this.paths.category, require('../routes/category') );
      this.app.use( this.paths.product, require('../routes/product') );
      this.app.use( this.paths.order, require('../routes/order') );
    }


    async connectDB(){
        await dbConnection();
    }

    middlewares(){

        //CORS 
        this.app.use( cors() );

        //Lectura y parseo del body (a formato json)
        this.app.use(express.json());

        //Servir contenido estatico
        this.app.use( express.static( 'public' ));

        //Config express-fileupload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true,
        }))
    }

    listen(){
        this.server.listen( this.port, ()=>{console.log('Server is listening port ', this.port)} );

    }

    sockets()
    {
        this.io.on('connection', socketController);
    }
}

module.exports = Server;
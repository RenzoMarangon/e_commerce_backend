const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
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
        this.app.listen( this.port, ()=>{console.log('Server is listening port ', this.port)} );

    }
}

module.exports = Server;
var createError = require('http-errors');
var logger = require('morgan');
var express = require('express');
import routes from './routes';


export class Config {
    public static setConf(app: any){
        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));

        app.all('/*', function(req: any, res: any, next: any) {
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.header('Access-Control-Allow-Credential', 'true');
            next();
        });

        app.use(routes);

        // catch 404 and forward to error handler
        app.use(function(req: any, res: any, next: any) {
            next(createError(404));
        });

        // error handler
        app.use(function(err: any, req: any, res: any, next: any) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500).json({'status': 'ERROR' , 'message': err.message});
        });
    }

}


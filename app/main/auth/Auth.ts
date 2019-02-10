import Knex from 'knex';
import Bookshelf from 'bookshelf';
import jwt from 'jwt-simple';
import moment from 'moment';
import {AuthInterface} from "./AuthInterface";

export class Auth {
    private knex: Knex;
    private bookshelf: Bookshelf;
    private secret: string = (process.env.SECRET || 'secret_token_login');
    private Model: any;
    private timeliveTokenSeconds: any = (process.env.TIME_LIVE_TOKEN_SECONDS || 300);

    constructor(){
        this.knex = Knex({
            client: 'sqlite3',
            connection: {
                filename: __dirname+'/../../../db/auth.sqlite3'
            },
            useNullAsDefault: true
        });
        this.bookshelf = Bookshelf(this.knex);
        this.Model= this.bookshelf.Model.extend({
            tableName: 'access_token'
        });
    }

    public generateToken(payload: AuthInterface){
        // @ts-ignore
        let token: string = jwt.encode(payload, this.secret);
        this.deleteCache(payload,(error: any)=>{
            if(!error){
                this.saveCache(token, payload);
            }
        });
        return token;
    }

    public validateToken(token: string, callback: any){
        if(Boolean(token)){
            let current: Date = new Date();
            this.Model.where({'token': token }).fetch()
                .then((user: any)=>{
                    if(Boolean(user)){
                        let userJson = user.toJSON();
                        let date: Date = userJson.date;
                        let timeliveSeconds: number = userJson.timelive_seconds;
                        let diffDates: number = this.diffDateInSeconds(date, current);
                        if(diffDates <= timeliveSeconds){
                            callback(true);
                        } else {
                            callback(false);
                        }
                    } else {
                        callback(false);
                    }
                }).error((error: any)=>{
                    console.log(error);
                    callback(false);
                })
        } else {
            callback(false);
        }
    }

    private diffDateInSeconds(date: Date, current: Date){
        return moment(current).diff(moment(date), 'seconds');
    }

    private saveCache(token: string, payload: AuthInterface){
        new this.Model({
            token: token,
            email: payload.email,
            date: payload.date,
            timelive_seconds: this.timeliveTokenSeconds
        }).save();
    }

    private deleteCache(payload: AuthInterface, callback: any){
        this.Model.where({'email': payload.email})
            .fetch().then((element: any)=>{
            if(element){
                this.Model.where({'email': payload.email })
                    .destroy()
                    .then(()=>callback(false));
            } else {
                callback(false);
            }
        }).error((error: any)=>callback(error));
    }
}


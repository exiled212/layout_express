import { Model } from "../../../main/Model";
import {AuthInterface} from "../../../main/auth/AuthInterface";

export class User extends Model{

    private person: any;

    constructor() {
        super();
        this.person = this.getBookshelf().Model.extend({
            tableName: 'user'
        });
    }

    getAll(callback: any){
        this.person.fetch().then(function(person: any){
            callback(person.toJSON());
        }).catch(function(err: any){
            console.log(err);
        })
    }

    get(properties: AuthInterface, callback: any){
        this.person.where({'email': properties.email, 'password': properties.password}).fetch().then(function(person: any){
            callback(person.toJSON());
        }).catch(function(err: any){
            console.log(err);
        })
    }

}

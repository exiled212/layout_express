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
        this.person.fetchAll({columns: ['id', 'email', 'name', 'lastname', 'active']}).then(function(person: any){
            if(Boolean(person)){
                callback(person.toJSON());
            } else {
                callback(null);
            }
        }).catch(function(err: any){
            console.log(err);
            callback(null);
        })
    }

    get(properties: AuthInterface, callback: any){
        this.person.where({'email': properties.email, 'password': properties.password, 'active': true}).fetch().then(function(person: any){
            if(Boolean(person)){
                callback(person.toJSON());
            } else {
                callback(null);
            }
        }).catch(function(err: any){
            console.log(err);
            callback(null);
        })
    }

}

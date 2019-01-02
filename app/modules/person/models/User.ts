import { Model } from "../../../main/Model";

export class User extends Model{

    private person: any;

    constructor() {
        super();
        this.person = this.getBookshelf().Model.extend({
            tableName: 'person'
        });
    }

    getAll(callback: any){
        this.person.where('id', 1).fetch().then(function(person: any){
            callback(person.toJSON());
        }).catch(function(err: any){
            console.log(err);
        })
    }

}

import Knex from 'knex';
import Bookshelf from 'bookshelf';
import path  from 'path';

let config: any = require(path.join(__dirname, '..', '..', 'knexfile.js'));

export class Model {
    private knex: Knex;
    private bookshelf: Bookshelf;

    constructor(){
        this.knex = Knex(config[process.env.NODE_ENV || 'development']);
        this.bookshelf = Bookshelf(this.knex);
    }

    getBookshelf(){
        return this.bookshelf;
    }

    getKnex(){
        return this.knex;
    }

}


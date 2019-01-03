import Knex from 'knex';
import Bookshelf from 'bookshelf';

export class Model {
    private knex: Knex;
    private bookshelf: Bookshelf;

    constructor(){
        this.knex = Knex({
            client: 'sqlite3',
            connection: {
                filename: __dirname+'/../../db/db.sqlite3'
            },
            useNullAsDefault: true
        });
        this.bookshelf = Bookshelf(this.knex);
    }

    getBookshelf(){
        return this.bookshelf;
    }

    getKnex(){
        return this.knex;
    }

}


import Knex from 'knex';
import Bookshelf from 'bookshelf';

export class Model {
    private knex: any;
    private bookshelf: any;

    constructor(){
        this.knex = Knex({
            client: 'sqlite3',
            connection: {
                filename: 'db.sqlite3'
            }
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


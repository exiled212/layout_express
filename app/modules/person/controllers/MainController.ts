import {User} from '../models/User';

export function index(req: any, res: any) {

    let user = new User();

    user.getAll(function(person: any){
        console.log(person);
    });

    res.status(200).json({test: 'hola'});
}

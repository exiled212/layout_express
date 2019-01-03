import {User} from '../models/User';
import {Auth} from "../../../main/auth/Auth";
import {UserInterface} from "../interfaces/UserInterface";
import {AuthInterface} from "../../../main/auth/AuthInterface";
import moment from 'moment';

export function index(req: any, res: any) {

    let user = new User();

    user.getAll(function(person: any){
        console.log(person);
    });
    res.status(200).json({test: 'hola'});
}

export function login(req: any, res: any){
    let model = new User();
    let auth = new Auth();

    model.get(req.body, function(user: UserInterface){
        let payload: AuthInterface = {
            id: user.id,
            email: user.email,
            date: new Date()
        };
        let token: string = auth.generateToken(payload);
        res.status(200).json({token});
    });
}

export function access(req: any, res: any) {

    let token: string = req.headers['x-auth-token'];
    let auth = new Auth();

    auth.validateToken( token, function(access: any){
        if(access){
            res.status(200).json({});
        }else {
            res.status(403).send(null);
        }
    })




}

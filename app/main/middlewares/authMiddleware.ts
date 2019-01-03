import {Auth} from "../auth/Auth";

export function isAuth(req: any, res: any, next: any){
    let token: string = req.headers['x-auth-token'];
    let auth = new Auth();

    auth.validateToken( token, function(access: any){
        if(access){
            next();
        }else {
            res.status(403).send(null);
        }
    })
}

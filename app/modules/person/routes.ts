import { index, login, access } from './controllers/MainController';
import {isAuth} from "../../main/middlewares/authMiddleware";

export function set(router: any){
    router.get('/person', index);
    router.post('/login', login);
    router.get('/login', isAuth,  access);
}

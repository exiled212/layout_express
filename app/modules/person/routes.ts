import { index, login } from './controllers/MainController';
import {isAuth} from "../../main/middlewares/authMiddleware";

export function set(router: any){
    router.get('/person', isAuth, index);
    router.post('/login', login);
}

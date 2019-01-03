import { index, login, access } from './controllers/MainController';

export function set(router: any){
    router.get('/person', index);
    router.post('/login', login);
    router.get('/login', access);
}

import { getAllUser, createUser } from './controllers/MainController';

export function set(router: any){

    router.get('/person', getAllUser);

    router.post('/person', createUser);

}

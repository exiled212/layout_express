import { index } from './controllers/MainController';

export function set(router: any){
    router.get('/person', index);
}

export function set(router: any){
    router.get('/person', function(req: any, res: any, next: any) {
        res.status(200).json({test: 'hola'});
    });
}

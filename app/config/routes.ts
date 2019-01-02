const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const modulesPath: string = path.join(__dirname, '..', 'modules');
const modules: string[] = fs.readdirSync(modulesPath);

for(let i in modules){
    const module = modules[i];
    const modulePath = path.join(modulesPath, module);
    const moduleInfo = fs.statSync(modulePath);

    if(moduleInfo.isDirectory()){
        const filepath = path.join('..', 'modules' , module, 'routes');
        import(filepath).then(routerModule=> {
            routerModule.set(router);
        })
    }
}

export = router;

import { ApplicationRef, NgModuleRef } from '@angular/core';
import { createNewHosts, hmrModule } from '@angularclass/hmr';
import { Log } from '~root/utils';

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
	let ngModule: NgModuleRef<any>;
	module.hot.accept();
	bootstrap()
		.then(mod => (ngModule = mod))
		.then((ngModuleRef: any) => {
			return hmrModule(ngModuleRef, module);
		})
		.catch(err => Log.error(err));
};

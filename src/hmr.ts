import { ApplicationRef, NgModuleRef } from '@angular/core';
import { createNewHosts, hmrModule } from '@angularclass/hmr';
import { Log } from '~root/utils';
import { enableDebugTools } from '@angular/platform-browser/src/browser/tools/tools';

let _decorateModuleRef = function identity<T>(value: T): T {
	return value;
};

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
	_decorateModuleRef = (modRef: any) => {
		const appRef = modRef.injector.get(ApplicationRef);
		const cmpRef = appRef.components[0];

		const _ng = (<any>window).ng;
		enableDebugTools(cmpRef);
		(<any>window).ng.probe = _ng.probe;
		(<any>window).ng.coreTokens = _ng.coreTokens;
		return modRef;
	};

	module.hot.accept();
	bootstrap()
		.then(_decorateModuleRef)
		.then((ngModuleRef: any) => {
			return hmrModule(ngModuleRef, module);
		})
		.catch(err => Log.error(err));
};

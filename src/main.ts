import '~utils/string-monkey-patch';

import { ApplicationRef, enableProdMode } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader, hmrModule } from '@angularclass/hmr';
import { Log } from '~utils';

import { AppRootModule } from './app/app-root';
import { environment } from './environments/environment';


declare let module: any;


let _decorateModuleRef = function identity<T>(value: T): T {
	return value;
};



_decorateModuleRef = (modRef: any) => {
	const appRef = modRef.injector.get(ApplicationRef);
	const cmpRef = appRef.components[0];

	const _ng = (<any>window).ng;
	enableDebugTools(cmpRef);
	(<any>window).ng.probe = _ng.probe;
	(<any>window).ng.coreTokens = _ng.coreTokens;
	return modRef;
};

export function main(): Promise<any> {
	// add some utility to String
	if (environment.production) {
		enableProdMode();
	}
	// if (environment.hmr && module['hot']) {
	// 	module['hot'].accept();
	// }
	return platformBrowserDynamic()
		.bootstrapModule(AppRootModule)
		.then(_decorateModuleRef)
		.then((ngModuleRef: any) => {
			return hmrModule(ngModuleRef, module);
		})
		.catch(err => Log.error(err));
}

bootloader(main);

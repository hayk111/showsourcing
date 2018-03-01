import '~utils/string-monkey-patch';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Log } from '~root/utils';

import { AppRootModule } from './app/app-root';
import { environment } from './environments/environment';

import { hmrBootstrap } from './hmr';
// add some utility to String
if (environment.production) {
	enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppRootModule);
// .catch(err => Log.error(err));

if (environment.hmr) {
	if (module['hot']) {
		hmrBootstrap(module, bootstrap);
	} else {
		console.error('HMR is not enabled for webpack-dev-server!');
		console.log('Are you using the --hmr flag for ng serve?');
	}
} else {
	bootstrap();
}

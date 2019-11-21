import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from 'environments/environment';
import { log, LogColor } from '~utils';
import { hmrBootstrap } from './hmr';

import { AppRootModule } from './app/app-root/app-root.module';

log.info(`%c 🐱‍🚀 App init. Time: ${performance.now()}`, LogColor.METADATA);

// using console log so it's not removed in production..
console.log(`%c 🎱 App version: ${environment.version}`, 'color: salmon');

if (environment.production) {
	enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppRootModule);

if (environment.hmr) {
	// tslint:disable-next-line:no-string-literal
	if (module['hot']) {
		hmrBootstrap(module, bootstrap);
	} else {
		log.debug('HMR is not enabled for webpack-dev-server!');
	}
} else {
	bootstrap().catch(err => log.debug(err));
}

import './app/core/analytics/setup';

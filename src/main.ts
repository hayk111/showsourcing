import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BootstrapModuleFn as Bootstrap, hmr, WebpackModule} from '@ngxs/hmr-plugin';
import { environment } from 'environments/environment';
import { log, LogColor } from '~utils';

import { AppRootModule } from './app/app-root/app-root.module';

declare const module: WebpackModule;

log.info(`%c 🐱‍🚀 App init. Time: ${performance.now()}`, LogColor.METADATA);

// using console log so it's not removed in production..
console.log(`%c 🎱 App version: ${environment.version}`, 'color: salmon');

if (environment.production) {
	enableProdMode();
}

const bootstrap: Bootstrap = () => platformBrowserDynamic().bootstrapModule(AppRootModule);

if (environment.hmr) {
	hmr(module, bootstrap).catch(err => log.debug(err));
} else {
	bootstrap().catch(err => log.debug(err));
}

import './app/core/analytics/setup';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from 'environments/environment';
import { log, LogColor } from '~utils';

import { AppRootModule } from './app/app-root/app-root.module';

log.info('%c 🐱‍🚀 App init ', LogColor.METADATA);
// using console log so it's not removed in production..
console.log(`%c 🎱 App version: ${environment.version}`, 'color: salmon');

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppRootModule)
	.catch(err => log.debug(err));


import './app/core/analytics/setup';

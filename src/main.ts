import { log, LogColor } from '~utils';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppRootModule } from './app/app-root/app-root.module';
import { environment } from 'environments/environment';

log.info('%c 🐱‍🚀 App init ', LogColor.METADATA);
console.log(`%c 🎱 App version: ${environment.version}`, 'color: salmon');

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppRootModule)
	.catch(err => log.debug(err));

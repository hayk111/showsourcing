import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app-root/app.module';
import { environment } from 'environments/environment';
import { log, LogColor } from '~utils';

log.info('%c 🐱‍🚀 App init ', LogColor.METADATA);
// using console log so it's not removed in production..
console.log(`%c 🎱 App version: ${environment.version}`, 'color: salmon');

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
	.catch(err => console.error(err));

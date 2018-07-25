import { log, LogColor } from '~utils';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppRootModule } from '~app-root/app-root.module';
import { environment } from 'environments/environment';

// lol, gotcha
let temp = window.console.log;
window.console.log = (...args) => {
	temp(...args, 'dumbass');
}

log.info('%c App init ', LogColor.METADATA);

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppRootModule)
	.catch(err => log.debug(err));

import { Log } from '~utils';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppRootModule } from './app/app-root/app-root.module';
import { environment } from './environments/environment';


if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppRootModule)
	.catch(err => Log.debug(err));

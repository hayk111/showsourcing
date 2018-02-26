import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppRootModule } from './app/app-root'
import { Log } from '~root/utils/index';
// add some utility to String
import '~utils/string-monkey-patch';

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic()
	.bootstrapModule(AppRootModule)
	.catch(err => Log.error(err));

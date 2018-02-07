import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppModule } from './app/modules/shared/app/app.module';
import Log from './app/utils/logger/log.class';
// add some utility to String
import './app/utils/string-monkey-patch';

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
	.catch(err => Log.error(err));

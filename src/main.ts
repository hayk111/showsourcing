import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppModule } from '~shared/app/app.module';
import { Log } from '~utils/index';
// add some utility to String
import '~utils/string-monkey-patch';

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
	.catch(err => Log.error(err));

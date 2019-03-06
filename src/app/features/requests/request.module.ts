import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import { RequestListViewComponent } from './components';
import { RequestPageComponent } from './containers/request-page/request-page.component';
import { routes } from '~features/requests/routes';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule
	],
	declarations: [
		RequestPageComponent,
		RequestListViewComponent
	],
	entryComponents: [],
	exports: [],
	providers: []
})
export class RequestModule {


}

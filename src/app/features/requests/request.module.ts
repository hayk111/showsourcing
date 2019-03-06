import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '~features/requests/routes';
import { SharedModule } from '~shared/shared.module';

import { RequestElementFormComponent, RequestListViewComponent } from './components';
import { RequestDetailsComponent } from './containers';
import { RequestPageComponent } from './containers/request-page/request-page.component';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule
	],
	declarations: [
		RequestDetailsComponent,
		RequestElementFormComponent,
		RequestListViewComponent,
		RequestPageComponent,
	],
	entryComponents: [],
	exports: [],
	providers: []
})
export class RequestModule {


}

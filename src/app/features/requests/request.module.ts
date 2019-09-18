import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestCommonModule } from '~common/request';
import { routes } from '~features/requests/routes';
import { SharedModule } from '~shared/shared.module';

import {
	RequestInformationComponent,
	RequestListViewComponent,
	RequestHeaderListComponent,
} from './components';
import { RequestDetailsComponent, RequestPageComponent } from './containers';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		RequestCommonModule
	],
	declarations: [
		RequestDetailsComponent,
		RequestInformationComponent,
		RequestListViewComponent,
		RequestPageComponent,
		RequestHeaderListComponent,
	],
	entryComponents: [],
	exports: [],
	providers: []
})
export class RequestModule {

}

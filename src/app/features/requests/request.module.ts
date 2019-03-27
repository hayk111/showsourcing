import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestCommonModule } from '~common/request';
import { routes } from '~features/requests/routes';
import { SharedModule } from '~shared/shared.module';

import {
	RequestElementFormComponent,
	RequestElementListViewComponent,
	RequestInformationComponent,
	RequestListViewComponent,
	RequestTopPanelComponent,
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
		RequestElementFormComponent,
		RequestElementListViewComponent,
		RequestInformationComponent,
		RequestListViewComponent,
		RequestPageComponent,
		RequestTopPanelComponent,
	],
	entryComponents: [],
	exports: [],
	providers: []
})
export class RequestModule {

}

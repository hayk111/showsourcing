import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '~features/requests/routes';
import { SharedModule } from '~shared/shared.module';

import {
	RequestInformationComponent,
	RequestTableComponent,
	RequestHeaderDetailsComponent,
} from './components';
import { RequestDetailsComponent, RequestPageComponent } from './containers';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
	],
	declarations: [
		RequestDetailsComponent,
		RequestInformationComponent,
		RequestTableComponent,
		RequestPageComponent,
		RequestHeaderDetailsComponent,
	],
	entryComponents: [],
	exports: [],
	providers: []
})
export class RequestModule {

}

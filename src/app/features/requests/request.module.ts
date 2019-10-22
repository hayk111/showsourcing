import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { routes } from '~features/requests/routes';
import { SharedModule } from '~shared/shared.module';

import { RequestHeaderDetailsComponent, RequestInformationComponent } from './components';
import { RequestDetailsComponent, RequestPageComponent } from './containers';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		TablesCommonModule
	],
	declarations: [
		RequestDetailsComponent,
		RequestInformationComponent,
		RequestPageComponent,
		RequestHeaderDetailsComponent,
	],
	entryComponents: [],
	exports: [],
	providers: []
})
export class RequestModule {

}

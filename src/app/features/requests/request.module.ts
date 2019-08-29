import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestCommonModule } from '~common/request';
import { routes } from '~features/requests/routes';
import { SharedModule } from '~shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import {
	RequestInformationComponent,
	RequestListViewComponent,
	RequestTopPanelComponent,
} from './components';
import { RequestDetailsComponent, RequestPageComponent } from './containers';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		RequestCommonModule,
		TranslateModule
	],
	declarations: [
		RequestDetailsComponent,
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

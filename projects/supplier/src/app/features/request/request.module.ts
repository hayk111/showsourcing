import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestCommonModule } from '~common/request';
import { SharedModule } from '~shared/shared.module';

import {
	RequestElementListViewComponent,
	RequestInformationComponent,
	RequestListViewComponent,
	RequestSortingMenuComponent,
	RequestTopPanelComponent,
} from './components';
import { RequestDetailsComponent, RequestElementDetailsComponent, RequestsPageComponent } from './containers';
import { routes } from './routes';


@NgModule({
	declarations: [
		RequestDetailsComponent,
		RequestElementDetailsComponent,
		RequestElementListViewComponent,
		RequestInformationComponent,
		RequestListViewComponent,
		RequestSortingMenuComponent,
		RequestTopPanelComponent,
		RequestsPageComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		RequestCommonModule,
		RouterModule.forChild(routes)
	]
})
export class RequestModule { }

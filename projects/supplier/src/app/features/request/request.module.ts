import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestCommonModule } from '~common/request';
import { SharedModule } from '~shared/shared.module';

import {
	RequestElementTableComponent,
	RequestInformationComponent,
	RequestTableComponent,
	RequestSortingMenuComponent,
	RequestHeaderListComponent,
} from './components';
import { RequestDetailsComponent, RequestsPageComponent } from './containers';
import { routes } from './routes';


@NgModule({
	declarations: [
		RequestDetailsComponent,
		RequestElementTableComponent,
		RequestInformationComponent,
		RequestTableComponent,
		RequestSortingMenuComponent,
		RequestHeaderListComponent,
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

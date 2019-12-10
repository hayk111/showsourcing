import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { SharedModule } from '~shared/shared.module';

import {
	RequestElementTableComponent,
	RequestHeaderDetailsComponent,
	RequestInformationComponent,
	RequestSortingMenuComponent,
	RequestTableComponent,
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
		RequestHeaderDetailsComponent,
		RequestsPageComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		TablesCommonModule,
		RouterModule.forChild(routes)
	]
})
export class RequestModule { }

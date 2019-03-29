import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestCommonModule } from '~common/request';
import { SharedModule } from '~shared/shared.module';

import { RequestListViewComponent } from './components';
import { RequestDetailsComponent, RequestsPageComponent, RequestElementDetailsComponent } from './containers';
import { routes } from './routes';


@NgModule({
	declarations: [
		RequestDetailsComponent,
		RequestElementDetailsComponent,
		RequestListViewComponent,
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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RequestsPageComponent } from './containers';
import { routes } from './routes';
import { RequestListViewComponent } from './components';
import { SharedModule } from '~shared/shared.module';
import { RequestCommonModule } from '~common/request';


@NgModule({
	declarations: [RequestsPageComponent, RequestListViewComponent],
	imports: [
		CommonModule,
		SharedModule,
		RequestCommonModule,
		RouterModule.forChild(routes)
	]
})
export class RequestModule { }

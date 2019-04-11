import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import { RequestElementListViewComponent, RequestSortingMenuComponent } from './components';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
	],
	declarations: [
		RequestElementListViewComponent,
		RequestSortingMenuComponent
	],
	exports: [
		RequestElementListViewComponent,
		RequestSortingMenuComponent
	]
})
export class RequestCommonModule { }

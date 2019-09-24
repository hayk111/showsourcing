import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import { RequestElementTableComponent, RequestSortingMenuComponent } from './components';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
	],
	declarations: [
		RequestElementTableComponent,
		RequestSortingMenuComponent
	],
	exports: [
		RequestElementTableComponent,
		RequestSortingMenuComponent
	]
})
export class RequestCommonModule { }

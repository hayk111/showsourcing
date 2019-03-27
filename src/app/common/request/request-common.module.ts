import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import { RequestSortingMenuComponent } from './components/request-sorting-menu/request-sorting-menu.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
	],
	declarations: [RequestSortingMenuComponent],
	exports: [RequestSortingMenuComponent]
})
export class RequestCommonModule { }

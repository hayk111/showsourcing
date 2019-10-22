import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';

import { SampleTableComponent } from './sample-table/sample-table.component';
import { TaskTableComponent } from './task-table/task-table.component';
import { CommonModule } from '@angular/common';




@NgModule({
	imports: [
		CommonModule,
		SharedModule,
	],
	declarations: [
		SampleTableComponent,
		TaskTableComponent,
	],
	exports: [
		SampleTableComponent,
		TaskTableComponent,
	],
	entryComponents: []
})
export class TablesCommonModule { }

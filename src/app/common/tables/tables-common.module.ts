import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';

import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { SampleTableComponent } from './sample-table/sample-table.component';
import { TaskTableComponent } from './task-table/task-table.component';




@NgModule({
	imports: [
		CommonModule,
		SharedModule,
	],
	declarations: [
		ProjectsTableComponent,
		SampleTableComponent,
		TaskTableComponent,
	],
	exports: [
		ProjectsTableComponent,
		SampleTableComponent,
		TaskTableComponent,
	],
	entryComponents: []
})
export class TablesCommonModule { }

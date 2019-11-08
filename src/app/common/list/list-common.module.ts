import { NgModule } from '@angular/core';

import { ListPageComponent } from './list-page/list-page.component';
import { TaskListComponent } from './task-list/task-list.component';
import { SampleListComponent } from './sample-list/sample-list.component';
import { ProjectListComponent } from './project-list/project-list.component';

import { CommonModule } from '@angular/common';
import { SharedModule } from '~shared/shared.module';

@NgModule({
	imports: [ CommonModule, SharedModule ],
	exports: [
		TaskListComponent,
		SampleListComponent,
		ProjectListComponent
	],
	declarations: [
		ListPageComponent,
		TaskListComponent,
		SampleListComponent,
		ProjectListComponent
	],
})
export class ListCommonModule { }

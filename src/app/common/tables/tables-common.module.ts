import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';

import { TaskTableComponent } from './task-table/task-table.component';




@NgModule({
	imports: [
		SharedModule,
	],
	declarations: [
		TaskTableComponent,
	],
	exports: [
		TaskTableComponent,
	],
	entryComponents: []
})
export class TablesCommonModule { }

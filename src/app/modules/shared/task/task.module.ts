import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTaskDlgComponent } from './components/new-task-dlg/new-task-dlg.component';
import { DialogModule } from '../dialog/dialog.module';

@NgModule({
  imports: [
		CommonModule,
		DialogModule
  ],
  declarations: [
		NewTaskDlgComponent
	],
	exports: [
		NewTaskDlgComponent
	]
})
export class TaskModule { }

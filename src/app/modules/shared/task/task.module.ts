import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTaskDlgComponent } from './components/new-task-dlg/new-task-dlg.component';
import { DialogModule } from '../dialog/dialog.module';
import { InputsModule } from '../inputs/inputs.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from '../select/select.module';

@NgModule({
  imports: [
		CommonModule,
		ReactiveFormsModule,
		DialogModule,
		InputsModule,
		SelectModule
  ],
  declarations: [
		NewTaskDlgComponent
	],
	exports: [
		NewTaskDlgComponent
	]
})
export class TaskModule { }

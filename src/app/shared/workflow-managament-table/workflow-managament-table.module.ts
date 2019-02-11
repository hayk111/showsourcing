import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowManagamentTableComponent } from './workflow-managament-table.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IconsModule } from '~shared/icons';

@NgModule({
	declarations: [WorkflowManagamentTableComponent],
	imports: [
		CommonModule,
		DragDropModule,
		IconsModule
	],
	exports: [WorkflowManagamentTableComponent]
})
export class WorkflowManagamentTableModule { }

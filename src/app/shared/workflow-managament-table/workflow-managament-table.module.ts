import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowManagamentTableComponent } from './workflow-managament-table.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
	declarations: [WorkflowManagamentTableComponent],
	imports: [
		CommonModule,
		DragDropModule
	],
	exports: [WorkflowManagamentTableComponent]
})
export class WorkflowManagamentTableModule { }

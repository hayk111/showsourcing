import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowManagamentTableComponent } from './workflow-managament-table.component';

@NgModule({
	declarations: [WorkflowManagamentTableComponent],
	imports: [
		CommonModule
	],
	exports: [WorkflowManagamentTableComponent]
})
export class WorkflowManagamentTableModule { }

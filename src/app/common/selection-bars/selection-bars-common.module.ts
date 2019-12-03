import { NgModule } from '@angular/core';

import { ProductSelectionBarComponent } from './product-selection-bar/product-selection-bar.component';
import { SupplierSelectionBarComponent } from './supplier-selection-bar/supplier-selection-bar.component';
import { ProjectSelectionBarComponent } from './project-selection-bar/project-selection-bar.component';
import { TaskSelectionBarComponent } from './task-selection-bar/task-selection-bar.component';
import { SampleSelectionBarComponent } from './sample-selection-bar/sample-selection-bar.component';
import { RequestSelectionBarComponent } from './request-selection-bar/request-selection-bar.component';
import { SharedModule } from '~shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
	],
	declarations: [
		ProductSelectionBarComponent,
		SupplierSelectionBarComponent,
		ProjectSelectionBarComponent,
		TaskSelectionBarComponent,
		SampleSelectionBarComponent,
		RequestSelectionBarComponent,
	],
	exports: [
		ProductSelectionBarComponent,
		SupplierSelectionBarComponent,
		ProjectSelectionBarComponent,
		TaskSelectionBarComponent,
		SampleSelectionBarComponent,
		RequestSelectionBarComponent,
	],
	providers: []
})
export class SelectionBarsCommonModule { }

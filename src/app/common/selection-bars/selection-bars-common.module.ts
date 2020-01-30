import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';

import { ContactSelectionBarComponent } from './contact-selection-bar/contact-selection-bar.component';
import { ProductSelectionBarComponent } from './product-selection-bar/product-selection-bar.component';
import { ProjectSelectionBarComponent } from './project-selection-bar/project-selection-bar.component';
import { RequestSelectionBarComponent } from './request-selection-bar/request-selection-bar.component';
import { SampleSelectionBarComponent } from './sample-selection-bar/sample-selection-bar.component';
import { SupplierSelectionBarComponent } from './supplier-selection-bar/supplier-selection-bar.component';
import { TaskSelectionBarComponent } from './task-selection-bar/task-selection-bar.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
	],
	declarations: [
		ContactSelectionBarComponent,
		ProductSelectionBarComponent,
		ProjectSelectionBarComponent,
		RequestSelectionBarComponent,
		SampleSelectionBarComponent,
		SupplierSelectionBarComponent,
		TaskSelectionBarComponent,
	],
	exports: [
		ContactSelectionBarComponent,
		ProductSelectionBarComponent,
		ProjectSelectionBarComponent,
		RequestSelectionBarComponent,
		SampleSelectionBarComponent,
		SupplierSelectionBarComponent,
		TaskSelectionBarComponent,
	],
	providers: []
})
export class SelectionBarsCommonModule { }

import { NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';
import { SharedModule } from '~shared/shared.module';
import { AttachmentListItemComponent } from './attachment-list-item/attachment-list-item.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { RequestElementListItemComponent } from './request-element-list-item/request-element-list-item.component';
import { SampleListItemComponent } from './sample-list-item/sample-list-item.component';
import { SupplierListItemComponent } from './supplier-list-item/supplier-list-item.component';
import { TaskListItemComponent } from './task-list-item/task-list-item.component';

@NgModule({
	imports: [ CommonModule, SharedModule ],
	exports: [
		AttachmentListItemComponent,
		ProductListItemComponent,
		RequestElementListItemComponent,
		SampleListItemComponent,
		SupplierListItemComponent,
		TaskListItemComponent
	],
	declarations: [
		AttachmentListItemComponent,
		ProductListItemComponent,
		RequestElementListItemComponent,
		SampleListItemComponent,
		SupplierListItemComponent,
		TaskListItemComponent
	],
})
export class ListCommonModule { }

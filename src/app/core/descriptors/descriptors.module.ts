import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductDescriptor } from './product-descriptor.component';
import { SampleDescriptor } from './sample-descriptor.component';
import { SupplierDescriptor } from './supplier-descriptor.component';
import { TaskDescriptor } from './task-descriptor.component';

const common = [
	ProductDescriptor,
	SampleDescriptor,
	SupplierDescriptor,
	TaskDescriptor
];

@NgModule({
	declarations: [...common],
	exports: [...common],
	imports: [
		CommonModule
	]
})
export class DescriptorsModule { }

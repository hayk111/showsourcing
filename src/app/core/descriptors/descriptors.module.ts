import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductDescriptor, SampleDescriptor, SupplierDescriptor, TaskDescriptor } from './entity-descriptors';


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

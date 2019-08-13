import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductDescriptor } from './product-descriptor.component';
import { SampleDescriptor } from './sample-descriptor.component';
import { SupplierDescriptor } from './supplier-descriptor.component';

const common = [
	ProductDescriptor,
	SampleDescriptor,
	SupplierDescriptor
];

@NgModule({
	declarations: [...common],
	exports: [...common],
	imports: [
		CommonModule
	]
})
export class DescriptorsModule { }

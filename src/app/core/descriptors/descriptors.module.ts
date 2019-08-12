import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductDescriptor } from './product-descriptor.component';

const common = [
	ProductDescriptor
];

@NgModule({
	declarations: [...common],
	exports: [...common],
	imports: [
		CommonModule
	]
})
export class DescriptorsModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductDescriptorComponent } from './product-descriptor.component';

const common = [
	ProductDescriptorComponent
];

@NgModule({
	declarations: [...common],
	exports: [...common],
	imports: [
		CommonModule
	]
})
export class DescriptorsModule { }

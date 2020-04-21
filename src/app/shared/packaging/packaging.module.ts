import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagingComponent } from './packaging.component';

@NgModule({
	declarations: [PackagingComponent],
	imports: [
		CommonModule
	],
	exports: [PackagingComponent]
})
export class PackagingModule { }

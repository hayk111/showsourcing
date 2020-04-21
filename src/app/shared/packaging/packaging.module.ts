import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagingComponent } from './packaging.component';
import { EditablePackagingComponent } from '~shared/dynamic-forms';

@NgModule({
	declarations: [PackagingComponent],
	imports: [
		CommonModule
	],
	exports: [PackagingComponent, EditablePackagingComponent]
})
export class PackagingModule { }

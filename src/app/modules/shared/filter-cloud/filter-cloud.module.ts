import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCloudComponent } from './components/filter-cloud/filter-cloud.component';
import { FilterTagComponent } from './components/filter-tag/filter-tag.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ FilterCloudComponent, FilterTagComponent ],
	exports: [ FilterCloudComponent ]
})
export class FilterCloudModule { }

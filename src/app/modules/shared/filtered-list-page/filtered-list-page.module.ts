import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilteredListPageComponent } from './components/filtered-list-page/filtered-list-page.component';
import { LoadersModule } from '../loaders/loaders.module';
import { Filters2Module } from '../filters2/filters2.module';
import { FilterCloudModule } from '../filter-cloud/filter-cloud.module';
import { FilterSearchBarModule } from '../filter-search-bar/filter-search-bar.module';

@NgModule({
	imports: [
		CommonModule,
		Filters2Module,
		FilterCloudModule,
		FilterSearchBarModule,
		LoadersModule,
	],
	declarations: [ FilteredListPageComponent ],
	exports: [ FilteredListPageComponent ]
})
export class FilteredListPageModule { }

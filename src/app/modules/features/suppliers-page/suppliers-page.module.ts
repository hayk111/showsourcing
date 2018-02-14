import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierPageComponent } from './components/supplier-page/supplier-page.component';
import { FilteredListPageModule } from '../../shared/filtered-list-page/filtered-list-page.module';
import { SupplierListViewComponent } from './components/supplier-list-view/supplier-list-view.component';
import { MatTableModule } from '@angular/material';
import { EntityPageModule } from '../../shared/entity-page/entity-page.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
	imports: [
		CommonModule,
		EntityPageModule,
		NgxDatatableModule
	],
	declarations: [ SupplierPageComponent, SupplierListViewComponent ]
})
export class SupplierPageModule { }

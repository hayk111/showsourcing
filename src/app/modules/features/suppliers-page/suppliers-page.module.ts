import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersPageComponent } from './components/suppliers-page/suppliers-page.component';
import { SupplierListViewComponent } from './components/supplier-list-view/supplier-list-view.component';
import { EntityPageModule } from '../../shared/entity-page/entity-page.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
	imports: [
		CommonModule,
		EntityPageModule,
		NgxDatatableModule
	],
	declarations: [ SuppliersPageComponent, SupplierListViewComponent ]
})
export class SuppliersPageModule { }

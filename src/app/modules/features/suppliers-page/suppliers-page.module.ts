import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersPageComponent } from './components/suppliers-page/suppliers-page.component';
import { SupplierListViewComponent } from './components/supplier-list-view/supplier-list-view.component';
import { EntityPageModule } from '../../shared/entity-page/entity-page.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TagModule } from '../../shared/tag/tag.module';
import { UserModule } from '../../shared/user/user.module';
import { UtilsModule } from '../../shared/utils/utils.module';
import { AppStoreModule } from '../../store/store.module';
import { SuppliersModule } from '../../shared/suppliers/suppliers.module';
import { SelectionBarModule } from '../../shared/selection-bar/selection-bar.module';

@NgModule({
	imports: [
		CommonModule,
		EntityPageModule,
		NgxDatatableModule,
		TagModule,
		UserModule,
		UtilsModule,
		AppStoreModule.forChild(),
		SuppliersModule,
		SelectionBarModule
	],
	declarations: [ SuppliersPageComponent, SupplierListViewComponent ]
})
export class SuppliersPageModule { }

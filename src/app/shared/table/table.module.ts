import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColumnDirective, TableComponent } from './components';
import { IconsModule } from '~app/shared/icons';
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { UserModule } from '~app/features/user';
import { AppStoreModule } from '~app/app-root/store/store.module';
import { RatingModule } from '~app/shared/rating';

@NgModule({
  imports: [
		CommonModule,
		IconsModule,
		UserModule.forChild(),
		AppStoreModule.forChild(), // TODO REMOVE when entityName pipe is removed from this module
		RatingModule
  ],
	declarations: [ TableComponent, ColumnDirective, CustomTableComponent ],
	exports: [ TableComponent, ColumnDirective, CustomTableComponent ]
})
export class TableModule { }

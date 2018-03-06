import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColumnDirective, TableComponent } from './components';
import { IconsModule } from '~app/shared/icons';
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { UserModule } from '~app/features/user';
import { EntityModule } from '~entity';
import { RatingModule } from '~app/shared/rating';
import { UtilsModule } from '~app/shared/utils';

@NgModule({
	imports: [
		CommonModule,
		IconsModule,
		UserModule.forChild(),
		EntityModule.forChild(), // TODO REMOVE when entityName pipe is removed from this module
		RatingModule,
		UtilsModule,
	],
	declarations: [TableComponent, ColumnDirective, CustomTableComponent],
	exports: [TableComponent, ColumnDirective, CustomTableComponent],
})
export class TableModule {}

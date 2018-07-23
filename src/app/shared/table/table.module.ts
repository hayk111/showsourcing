import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColumnDirective, TableComponent } from '~shared/table/components';
import { IconsModule } from '~shared/icons';
import { CustomTableComponent } from '~shared/table/components/custom-table/custom-table.component';
import { UserModule } from '~features/user';
import { RatingModule } from '~shared/rating';
import { UtilsModule } from '~shared/utils';
import { SharedModule } from '~shared/shared.module';

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [TableComponent, ColumnDirective, CustomTableComponent],
	exports: [TableComponent, ColumnDirective, CustomTableComponent],
})
export class TableModule { }

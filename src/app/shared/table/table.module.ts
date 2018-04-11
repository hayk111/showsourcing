import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColumnDirective, TableComponent } from './components';
import { IconsModule } from '~app/shared/icons';
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { UserModule } from '~app/features/user';
import { EntityModule } from '~entity';
import { RatingModule } from '~app/shared/rating';
import { UtilsModule } from '~app/shared/utils';
import { SharedModule } from '~app/shared/shared.module';

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [TableComponent, ColumnDirective, CustomTableComponent],
	exports: [TableComponent, ColumnDirective, CustomTableComponent],
})
export class TableModule { }

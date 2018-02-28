import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColumnDirective, TableComponent } from './components';
import { IconsModule } from '~app/shared/icons';

@NgModule({
  imports: [
		CommonModule,
		IconsModule
  ],
	declarations: [ TableComponent, ColumnDirective ],
	exports: [ TableComponent, ColumnDirective ]
})
export class TableModule { }

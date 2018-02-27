import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColumnDirective, TableComponent } from './components';

@NgModule({
  imports: [
    CommonModule
  ],
	declarations: [ TableComponent, ColumnDirective ],
	exports: [ TableComponent, ColumnDirective ]
})
export class TableModule { }

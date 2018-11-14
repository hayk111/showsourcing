import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';
import { ColumnDirective, TableComponent } from '~shared/table/components';
import { CustomTableComponent } from '~shared/table/components/custom-table/custom-table.component';

@NgModule({
	imports: [
		SharedModule,
		OverlayModule,
		CommonModule,
		ScrollDispatchModule

	],
	declarations: [TableComponent, ColumnDirective, CustomTableComponent],
	exports: [TableComponent, ColumnDirective, CustomTableComponent],
})
export class TableModule { }

import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';
import { ColumnDirective, TableComponent } from '~shared/table/components';
import { CustomTableComponent } from '~shared/table/components/custom-table/custom-table.component';
import { CommonModule } from '@angular/common';
import { InputsModule } from '~shared/inputs';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { IconsModule } from '~shared/icons';
import { LoadersModule } from '~shared/loaders';

@NgModule({
	imports: [
		CommonModule,
		OverlayModule,
		ScrollingModule,
		InputsModule,
		ContextMenuModule,
		IconsModule,
		LoadersModule
	],
	declarations: [TableComponent, ColumnDirective, CustomTableComponent],
	exports: [TableComponent, ColumnDirective, CustomTableComponent],
})
export class TableModule { }

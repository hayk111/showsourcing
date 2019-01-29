import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { IconsModule } from '~shared/icons';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { LoadersModule } from '~shared/loaders';
import { PriceModule } from '~shared/price';
import { StatusSelectorModule } from '~shared/status-selector/status-selector.module';
import { ColumnDirective, TableComponent } from '~shared/table/components';
import { CustomTableComponent } from '~shared/table/components/custom-table/custom-table.component';
import { ItemCompareRowComponent } from '~shared/table/components/item-comapre-row/item-comapre-row.component';
import { UtilsModule } from '~shared/utils';

@NgModule({
	imports: [
		CommonModule,
		ContextMenuModule,
		IconsModule,
		ImageModule,
		InputsModule,
		LoadersModule,
		OverlayModule,
		PriceModule,
		ScrollingModule,
		StatusSelectorModule,
		UtilsModule,
	],
	declarations: [TableComponent, ColumnDirective, CustomTableComponent, ItemCompareRowComponent],
	exports: [TableComponent, ColumnDirective, CustomTableComponent, ItemCompareRowComponent],
})
export class TableModule { }

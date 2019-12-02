import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { IconsModule } from '~shared/icons';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { InputsCustomModule } from '~shared/inputs-custom/inputs-custom.module';
import { LoadersModule } from '~shared/loaders';
import { LogoModule } from '~shared/logo';
import { PaginationModule } from '~shared/pagination/pagination.module';
import { PriceModule } from '~shared/price';
import { StatusSelectorModule } from '~shared/status-selector/status-selector.module';
import { ColumnDirective, TableComponent } from '~shared/table/components';
import { UtilsModule } from '~shared/utils';

@NgModule({
	imports: [
		CommonModule,
		ContextMenuModule,
		IconsModule,
		ImageModule,
		InputsModule,
		InputsCustomModule,
		LoadersModule,
		LogoModule,
		OverlayModule,
		PriceModule,
		ScrollingModule,
		StatusSelectorModule,
		UtilsModule,
		PaginationModule,
	],
	declarations: [TableComponent, ColumnDirective],
	exports: [TableComponent, ColumnDirective],
})
export class TableModule { }

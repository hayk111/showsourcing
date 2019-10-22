import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';
import { ProductsGridComponent } from './products-grid/products-grid.component';

@NgModule({
	imports: [SharedModule],
	declarations: [ProductsGridComponent],
	exports: [ProductsGridComponent]
})
export class GridsCommonModule { }

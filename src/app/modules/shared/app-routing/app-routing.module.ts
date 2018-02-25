import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductDetailsPageModule } from '~products/features/product-details/product-details-page.module';
import { ProductsPageModule } from '~products/features/products-page/products-page.module';
import { SuppliersModule } from '~suppliers';

import { HomeModule } from '../../features/home/home.module';
import { TasksModule } from '~tasks';
import { TestModule } from '../../features/test/test.module';
import { ProductModule } from '~products';
import { routes } from './routes';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(routes),
		HomeModule,
		ProductsPageModule,
		ProductModule,
		TasksModule,
		SuppliersModule,
		ProductDetailsPageModule,
		TestModule,
	],
	exports: [RouterModule],
	declarations: [],
})
export class AppRoutingModule {}

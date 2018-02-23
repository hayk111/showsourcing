import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductDetailsPageModule } from '~products/features/product-details/product-details-page.module';
import { ProductsPageModule } from '~products/features/products-page/products-page.module';
import { SuppliersModule } from '~suppliers';

import { EventsPageModule } from '../../features/events-page/events-page.module';
import { HomeModule } from '../../features/home/home.module';
import { TasksPageModule } from '../../features/tasks-page/tasks-page.module';
import { TestModule } from '../../features/test/test.module';
import { ProductModule } from './../../products/product.module';
import { routes } from './routes';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(routes),
		HomeModule,
		ProductsPageModule,
		ProductModule,
		TasksPageModule,
		EventsPageModule,
		SuppliersModule,
		ProductDetailsPageModule,
		TestModule,
	],
	exports: [RouterModule],
	declarations: [],
})
export class AppRoutingModule {}

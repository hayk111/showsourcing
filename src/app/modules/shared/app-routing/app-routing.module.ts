import { ProductModule } from './../../products/product.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { HomeModule } from '../../features/home/home.module';
import { ProductsPageModule } from '~products/features/products-page/products-page.module';
import { TasksPageModule } from '../../features/tasks-page/tasks-page.module';
import { EventsPageModule } from '../../features/events-page/events-page.module';
import { SuppliersModule } from '~suppliers';
import { TestModule } from '../../features/test/test.module';
import { ProductDetailsPageModule } from '~products/features/product-page/product-details-page.module';

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

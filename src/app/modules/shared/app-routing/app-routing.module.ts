import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { HomeModule } from '../../features/home/home.module';
import { ProductsPageModule } from '../../features/products-page/products-page.module';
import { TasksPageModule } from '../../features/tasks-page/tasks-page.module';
import { EventsPageModule } from '../../features/events-page/events-page.module';
import { SupplierPageModule } from '../../features/supplier-page/supplier-page.module';
import { TestModule } from '../../features/test/test.module';
import { ProductPageModule } from '../../features/product-page/product-page.module';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(routes),
		HomeModule,
		ProductsPageModule,
		TasksPageModule,
		EventsPageModule,
		SupplierPageModule,
		ProductPageModule,
		TestModule
	],
	exports: [ RouterModule ],
	declarations: []
})
export class AppRoutingModule { }

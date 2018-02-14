import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { HomeModule } from '../../features/home/home.module';
import { ProductsPageModule } from '../../features/products-page/products-page.module';
import { TasksPageModule } from '../../features/tasks-page/tasks-page.module';
import { EventsPageModule } from '../../features/events-page/events-page.module';
import { SuppliersPageModule } from '../../features/suppliers-page/suppliers-page.module';
import { TestModule } from '../../features/test/test.module';
import { ProductDetailsPageModule } from '../../features/product-page/product-details-page.module';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(routes),
		HomeModule,
		ProductsPageModule,
		TasksPageModule,
		EventsPageModule,
		SuppliersPageModule,
		ProductDetailsPageModule,
		TestModule
	],
	exports: [ RouterModule ],
	declarations: []
})
export class AppRoutingModule { }

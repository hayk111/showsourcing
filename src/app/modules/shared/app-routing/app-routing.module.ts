import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { HomeModule } from '../../features/home/home.module';
import { InfoRequestModule } from '../../features/info-request/info-request.module';
import { TestModule } from '../../features/test/test.module';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(routes),
		HomeModule,
		InfoRequestModule,
		TestModule,
	],
	exports: [ RouterModule ],
	declarations: []
})
export class AppRoutingModule { }

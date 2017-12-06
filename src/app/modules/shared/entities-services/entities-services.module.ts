import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PreloaderService } from './preloader.service';
import { ProductService } from './product.service';
import { TeamService } from './team.service';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule
	],
	declarations: [],
	providers: [ PreloaderService, ProductService, TeamService ]
})
export class EntitiesServicesModule { }

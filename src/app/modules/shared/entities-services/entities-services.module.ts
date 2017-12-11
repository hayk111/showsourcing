import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PreloaderService } from './preloader.service';
import { ProductService } from './product.service';
import { TeamService } from './team.service';
import { UploaderModule } from '../uploader/uploader.module';
import { TeamItemLoaderService } from './team-item-loader.service';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		UploaderModule
	],
	declarations: [],
	providers: [ PreloaderService, TeamItemLoaderService, ProductService, TeamService,  ]
})
export class EntitiesServicesModule { }

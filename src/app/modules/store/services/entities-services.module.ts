import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PreloaderService } from './preloader.service';
import { ProductService } from './product.service';
import { TeamService } from './team.service';
import { TeamItemLoaderService } from './team-item-loader.service';
import { TaskService } from './task.service';
import { CustomFieldsService } from './custom-fields.service';
import { CommentService } from './comment.service';
import { FileService } from './file.service';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
	],
	declarations: [],
	providers: [
		PreloaderService,
		TeamItemLoaderService,
		ProductService,
		TeamService,
		TaskService,
		CustomFieldsService,
		CommentService,
		FileService
	]
})
export class EntitiesServicesModule { }

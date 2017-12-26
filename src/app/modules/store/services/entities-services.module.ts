import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './product.service';
import { TeamService } from './team.service';
import { TeamItemLoaderService } from './team-item-loader.service';
import { TaskService } from './task.service';
import { CustomFieldsService } from './custom-fields.service';
import { CommentService } from './comment.service';
import { FileService } from './file.service';
import { CurrencyService } from './currency.service';
import { CountryService } from './country.service';
import { VoteService } from './vote.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { TokenService } from './token.service';
import { MatSnackBarModule } from '@angular/material';
import { LocalStorageModule } from '../../shared/local-storage/local-storage.module';
import { ImageService } from './images.service';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		MatSnackBarModule,
		LocalStorageModule
	],
	declarations: [],
	providers: [
		TeamItemLoaderService,
		ProductService,
		TeamService,
		TaskService,
		CustomFieldsService,
		CommentService,
		FileService,
		CurrencyService,
		CountryService,
		VoteService,
		AuthService,
		UserService,
		TokenService,
		ImageService
	]
})
export class EntitiesServicesModule { }

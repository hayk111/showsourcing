import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PreloaderService } from './services/preloader.service';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule
	],
	declarations: [],
	providers: [ PreloaderService ]
})
export class PreloaderModule { }

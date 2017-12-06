import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ImgInputComponent } from './components/img-input/img-input.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { FileDropModule } from 'ngx-file-drop';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		FileDropModule
	],
	declarations: [
		ImgInputComponent,
		FileInputComponent
	],
	exports: [
		ImgInputComponent,
		FileInputComponent
	]
})
export class UploaderModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ImgInputComponent } from './components/img-input/img-input.component';
import { FileInputComponent } from './components/file-input/file-input.component';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule
	],
	declarations: [
	ImgInputComponent,
	FileInputComponent],
	exports: [
	]
})
export class UploaderModule { }

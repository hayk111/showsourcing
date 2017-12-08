import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ImgInputComponent } from './components/img-input/img-input.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { FileDropModule } from 'ngx-file-drop';
import { FileUploader2 } from './services/file-uploader2.service';

@NgModule({
	imports: [
		CommonModule,
		FileDropModule
	],
	declarations: [
		ImgInputComponent,
		FileInputComponent
	],
	providers: [ FileUploader2 ],
	exports: [
		ImgInputComponent,
		FileInputComponent
	]
})
export class UploaderModule { }

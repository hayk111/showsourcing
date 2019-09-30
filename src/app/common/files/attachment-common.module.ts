import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';
import { AttachmentTableComponent } from './components';



@NgModule({
	imports: [
		SharedModule,
	],
	declarations: [
		AttachmentTableComponent,
	],
	exports: [
		AttachmentTableComponent
	],
	entryComponents: []
})
export class FileCommonModule { }

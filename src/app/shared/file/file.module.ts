import { NgModule } from '@angular/core';
import { CardModule } from '~shared/card/card.module';
import { FilesCardComponent, FilesPageComponent } from '~shared/file/containers';
import { FileDropDirective } from '~shared/file/directives/file-drop.directive';
import { FileSelectDirective } from '~shared/file/directives/file-select.directive';
import { CommonModule } from '@angular/common';
import { LoadersModule } from '~shared/loaders';
import { IconsModule } from '~shared/icons';
import { ListModule } from '~shared/list/list.module';
import { FileSizePipe } from './pipes';

@NgModule({
	imports: [
		CommonModule,
		CardModule,
		LoadersModule,
		IconsModule,
		ListModule
	],
	declarations: [
		FileDropDirective,
		FileSelectDirective,
		FilesPageComponent,
		FilesCardComponent,
		FileSizePipe
	],
	exports: [
		FileDropDirective,
		FileSelectDirective,
		FilesPageComponent,
		FilesCardComponent
	],
})
export class FileModule {

}

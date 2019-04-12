import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from '~shared/card/card.module';
import { FilesCardComponent, FilesPageComponent } from '~shared/file/containers';
import { FileDropDirective } from '~shared/file/directives/file-drop.directive';
import { FileSelectDirective } from '~shared/file/directives/file-select.directive';
import { IconsModule } from '~shared/icons';
import { InputsModule } from '~shared/inputs';
import { ListModule } from '~shared/list/list.module';
import { LoadersModule } from '~shared/loaders';

import { FileListComponent, FileReviewerComponent, NoFilePlaceholderComponent } from './components';
import { FileSizePipe } from './pipes';

@NgModule({
	imports: [
		CommonModule,
		CardModule,
		LoadersModule,
		IconsModule,
		ListModule,
		InputsModule
	],
	declarations: [
		FileDropDirective,
		FileListComponent,
		FileReviewerComponent,
		FileSelectDirective,
		FileSizePipe,
		FilesCardComponent,
		FilesPageComponent,
		NoFilePlaceholderComponent,
	],
	exports: [
		FileDropDirective,
		FileListComponent,
		FileReviewerComponent,
		FileSelectDirective,
		FilesCardComponent,
		FilesPageComponent,
		NoFilePlaceholderComponent,
	],
})
export class FileModule {

}

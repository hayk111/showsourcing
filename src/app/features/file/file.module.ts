import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CarouselModule } from '~shared/carousel';

import { CarouselSelectionComponent, FilesPageComponent } from './containers';
import { FileDropDirective } from './directives/file-drop.directive';
import { FileSelectDirective } from './directives/file-select.directive';
import { FileService, ImageService } from './services';
import { LoadersModule } from '~shared/loaders';
import { AppStoreModule } from '~app/app-root/store/store.module';

@NgModule({
	imports: [
		CommonModule,
		CarouselModule,
		LoadersModule,
		AppStoreModule.forChild()
	],
	declarations: [
	  FileDropDirective,
		FileSelectDirective,
		FilesPageComponent,
		CarouselSelectionComponent
  ],
	exports: [
	  FileDropDirective,
		FileSelectDirective,
		FilesPageComponent,
		CarouselSelectionComponent
	],
	providers: [ FileService, ImageService ]
})
export class FileModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: FileModule,
			providers: [ FileService, ImageService ],
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: FileModule,
		};
	}
}

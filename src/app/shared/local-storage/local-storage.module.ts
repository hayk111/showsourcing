import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './local-storage.service';
import { ModuleWithProviders } from '@angular/core';

@NgModule({
	imports: [CommonModule],
	providers: [LocalStorageService],
	declarations: [],
})
export class LocalStorageModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: LocalStorageModule,
			providers: [LocalStorageService],
		};
	}
}

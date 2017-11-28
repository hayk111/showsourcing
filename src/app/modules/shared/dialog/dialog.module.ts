import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatIconModule } from '@angular/material';
import { DialogService } from './services/dialog.service';


@NgModule({
	imports: [
		CommonModule,
		MatIconModule
	],
	declarations: [ DialogComponent ],
	exports: [ DialogComponent ]
})
export class DialogModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: DialogModule,
			providers: [ DialogService ]
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: DialogModule
		};
	}
}

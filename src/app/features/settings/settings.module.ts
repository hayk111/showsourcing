import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';


import { SettingsComponent } from './containers';
import {
	SettingsProfileComponent, SettingsMenuComponent,
	SettingsMenuItemComponent, SettingsMenuItemLabelDirective
} from './components';
import { UserModule } from '~features/user';
import { SharedModule } from '~shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';

@NgModule({
	imports: [
		SharedModule,
		ReactiveFormsModule,
		RouterModule,
		TopPanelModule,
		UserModule.forChild()
	],
	providers: [],
	declarations: [
		SettingsComponent, SettingsProfileComponent,
		SettingsMenuComponent, SettingsMenuItemComponent,
		SettingsMenuItemLabelDirective
	],
	exports: [],
})
export class SettingsModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SettingsModule,
			providers: []
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: SettingsModule,
		};
	}

}

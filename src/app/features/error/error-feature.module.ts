import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import { GenericErrorPageComponent } from './pages/generic-error/generic-error-page.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{ path: '', redirectTo: 'generic', pathMatch: 'full' },
			{ path: 'generic', component: GenericErrorPageComponent },
		])
	],
	declarations: [
		GenericErrorPageComponent
	]
})
export class ErrorFeatureModule { }

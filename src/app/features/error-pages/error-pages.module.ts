import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { GenericErrorPageComponent } from './generic-error-page/generic-error-page.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{ path: '', redirectTo: 'generic', pathMatch: 'full' },
			{ path: 'generic', component: GenericErrorPageComponent },
		]),
		TranslateModule
	],
	declarations: [
		GenericErrorPageComponent
	]
})
export class ErrorPagesModule { }

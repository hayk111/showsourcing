import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericErrorPageComponent } from './generic-error-page/generic-error-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', redirectTo: 'generic', pathMatch: 'full' },
			{ path: 'generic', component: GenericErrorPageComponent },
		])
	],
	declarations: [
		GenericErrorPageComponent
	]
})
export class ErrorPagesModule { }

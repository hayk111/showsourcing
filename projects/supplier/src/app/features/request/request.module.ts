import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RequestsPageComponent } from './requests-page/requests-page.component';

@NgModule({
	declarations: [RequestsPageComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', redirectTo: 'all', pathMatch: 'full' },
			{ path: '', component: RequestsPageComponent }
		])
	]
})
export class RequestModule { }

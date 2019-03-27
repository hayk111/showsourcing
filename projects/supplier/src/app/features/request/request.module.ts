import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RequestsPageComponent } from './requests-page/requests-page.component';
import { routes } from './routes';


@NgModule({
	declarations: [RequestsPageComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class RequestModule { }

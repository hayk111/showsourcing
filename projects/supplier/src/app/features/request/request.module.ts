import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RequestPageComponent } from './request-page/request-page.component';
import { AuthenticatedGuard } from '~core/auth';
import { GlobalRequestClientReadyGuard } from '~core/apollo/guards/client-ready.guard.service';

@NgModule({
	declarations: [RequestPageComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: 'request',
				component: RequestPageComponent,
				canActivate: [
					AuthenticatedGuard,
					GlobalRequestClientReadyGuard
				]
			}
		])
	]
})
export class RequestModule { }

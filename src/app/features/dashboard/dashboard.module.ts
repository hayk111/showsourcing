import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { RouterModule } from '../../../../node_modules/@angular/router';
import { routes } from './routes';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	declarations: [DashboardComponent]
})
export class DashboardModule { }

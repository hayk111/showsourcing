import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { RouterModule } from '../../../../node_modules/@angular/router';
import { routes } from './routes';
import { ActivityModule } from '~shared/activity/activity.module';
import { DialogModule } from '~shared/dialog';
import { CustomDialogModule } from '~shared/custom-dialog';
import { ProductDialogService } from '~shared/custom-dialog/services/product-dialog-service';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ActivityModule,
		DialogModule,
		CustomDialogModule
	],
	declarations: [DashboardComponent],
	providers: [
		ProductDialogService
	]
})
export class DashboardModule { }

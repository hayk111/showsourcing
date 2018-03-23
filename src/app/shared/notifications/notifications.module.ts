import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationContainerComponent } from './components/notification-container/notification-container.component';
import { NotificationService } from '~app/shared/notifications/services/notification.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
	imports: [CommonModule],
	declarations: [NotificationComponent, NotificationContainerComponent],
	exports: [NotificationContainerComponent],
	providers: [NotificationService],
})
export class NotificationsModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: NotificationsModule,
			providers: [NotificationService],
		};
	}
}

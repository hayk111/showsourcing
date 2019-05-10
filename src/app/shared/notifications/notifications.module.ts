import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '~shared/icons/icons.module';
import {
	NotificationContainerComponent,
} from '~shared/notifications/components/notification-container/notification-container.component';
import { NotificationComponent } from '~shared/notifications/components/notification/notification.component';

@NgModule({
	imports: [CommonModule, IconsModule],
	declarations: [NotificationComponent, NotificationContainerComponent],
	exports: [NotificationContainerComponent],
	providers: [],
})
export class NotificationsModule {

}

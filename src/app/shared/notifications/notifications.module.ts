import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '~shared/notifications/components/notification/notification.component';
import { NotificationContainerComponent } from '~shared/notifications/components/notification-container/notification-container.component';
import { NotificationService } from '~shared/notifications/services/notification.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { IconsModule } from '~shared/icons/icons.module';

@NgModule({
	imports: [CommonModule, IconsModule],
	declarations: [NotificationComponent, NotificationContainerComponent],
	exports: [NotificationContainerComponent],
	providers: [NotificationService],
})
export class NotificationsModule {

}

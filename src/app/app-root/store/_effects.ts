import { AppErrorsEffects } from '~app/shared/error-handler';
import { NotificationEffects } from '~app/shared/notifications/store/notification.effects';
import {
	UserEffects,
	CustomFieldsEffects,
	ImageEffects,
} from '~app/entity';



export const effects = [
	// entities
	UserEffects,
	CustomFieldsEffects,
	ImageEffects,
	// misc
	AppErrorsEffects,
	// UI
	NotificationEffects,
];

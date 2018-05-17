import { AppErrorsEffects } from '~app/shared/error-handler';
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
];

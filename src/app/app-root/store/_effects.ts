import { AppErrorsEffects } from '~app/shared/error-handler';
import { NotificationEffects } from '~app/shared/notifications/store/notification.effects';
import {
	TaskEffects, TeamEffects, UserEffects, CategoryEffects, CountryEffects, CurrencyEffects, HarbourEffects, IncoTermsEffects,
	TeamMembersEffects, CustomFieldsEffects, EventEffects, TagEffects, ProjectEffects, FilesEffects, SuppliersEffects,
	ImageEffects, CommentEffects, ProductStatusEffects, TaskStatusEffects, SupplierStatusEffects, TaskTypeEffects
} from '~app/entity';



export const effects = [
	// entities
	TaskEffects,
	TeamEffects,
	UserEffects,
	CountryEffects,
	CurrencyEffects,
	HarbourEffects,
	IncoTermsEffects,
	CustomFieldsEffects,
	TeamMembersEffects,
	CategoryEffects,
	EventEffects,
	TagEffects,
	ProjectEffects,
	SuppliersEffects,
	FilesEffects,
	ImageEffects,
	CommentEffects,
	// constants
	TaskStatusEffects,
	ProductStatusEffects,
	SupplierStatusEffects,
	TaskTypeEffects,
	// misc
	AppErrorsEffects,
	// UI
	NotificationEffects,
];

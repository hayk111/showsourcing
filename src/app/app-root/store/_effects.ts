
import { TokenEffects, AuthenticationEffects } from '~auth';
import { FilterEntityPanelEffects } from '~shared/filters';
import { AppErrorsEffects } from '~app/shared/error-handler';
import { NotificationEffects } from '~app/shared/notifications/store/notification.effects';
import {
	TaskEffects, TeamEffects, UserEffects, CountryEffects, CurrencyEffects, HarbourEffects,
	IncoTermsEffects, CustomFieldsEffects, TeamMembersEffects, CategoryEffects, EventEffects, TagEffects,
	ProjectEffects, SuppliersEffects, FilesEffects, CommentEffects, TaskStatusEffects, ImageEffects, ProductStatusEffects,
	SupplierStatusEffects, TaskTypeEffects
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
	AuthenticationEffects,
	TokenEffects,
	// PreloaderEffects,
	FilterEntityPanelEffects,

	// UI
	NotificationEffects,
];

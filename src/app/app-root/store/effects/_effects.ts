import { CommentEffects } from '~comment/store/effects/comments.effects';
import { ProjectEffects } from '~projects';
import { SuppliersEffects } from '~suppliers';
import { TaskEffects } from '~tasks/store/effects/task.effects';
import { UserEffects } from '~user/store/effects/user.effects';

import { CategoryEffects } from './entities/category.effects';
import { CountryEffects } from './entities/country.effects';
import { CurrencyEffects } from './entities/currency.effects';
import { CustomFieldsEffects } from './entities/custom-fields.effects';
import { EventEffects } from '~events/store';
import { TagEffects } from './entities/tag.effects';
import { TeamMembersEffects } from './entities/team-members.effects';
import { TeamEffects } from './entities/team.effects';
import { TokenEffects, AuthenticationEffects } from '~auth';
import { FilesEffects } from '~features/file';
import { ImageEffects } from '~features/file';
import { FilterEntityPanelEffects } from '~shared/filters';
import { HarbourEffects } from '~app/app-root/store/effects/entities/harbour.effects';
import { IncoTermsEffects } from '~app/app-root/store/effects/entities/inco-terms.effects';
import { AppErrorsEffects } from '~app/shared/error-handler';
import { NotificationEffects } from '~app/shared/notifications/store/notification.effects';
import { TaskStatusEffects } from '~app/app-root/store/effects/entities/task-status.effects';
import { ProductStatusEffects } from '~app/app-root/store/effects/entities/product-status.effects';
import { SupplierStatusEffects } from '~app/app-root/store/effects/entities/supplier-status.effects';
import { TaskTypeEffects } from '~app/app-root/store/effects/entities/task-type.effects';

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

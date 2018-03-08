import { CommentTargetEffects } from '~comment/store/effects/comments.effects';
import { ProjectEffects } from '~projects';
import { SuppliersEffects } from '~suppliers';
import { TaskEffects } from '~tasks/store/effects/task.effects';
import { UserEffects } from '~user/store/effects/user.effects';

import { CategoryEffects } from './entities/category.effects';
import { CountryEffects } from './entities/country.effects';
import { CurrencyEffects } from './entities/currency.effects';
import { CustomFieldsEffects } from './entities/custom-fields.effects';
import { EventEffects } from './entities/event.effects';
import { TagEffects } from './entities/tag.effects';
import { TeamMembersEffects } from './entities/team-members.effects';
import { TeamEffects } from './entities/team.effects';
import { AppErrorsEffects } from './misc/app-error.effects';
import { TokenEffects, AuthenticationEffects } from '~auth';
import { FilesEffects } from '~features/file';
import { ImageEffects } from '~features/file';
import { ProjectTargetEffects } from './target/project.effects';
import { TagTargetEffects } from './target/tag.effects';
import { TargetEffects } from './target/target.effects';
import { TaskTargetEffects } from './target/task.effects';
import { VoteTargetEffects } from './target/vote.effects';
import { FeedbackDlgEffects } from './ui/feedback-dlg.effects';
import { FilterEntityPanelEffects } from '~shared/filters';

export const effects = [
	// entities
	TaskEffects,
	TeamEffects,
	UserEffects,
	CountryEffects,
	CurrencyEffects,
	CustomFieldsEffects,
	TeamMembersEffects,
	CategoryEffects,
	EventEffects,
	TagEffects,
	ProjectEffects,
	SuppliersEffects,

	// misc
	AppErrorsEffects,
	AuthenticationEffects,
	TokenEffects,
	// PreloaderEffects,
	FilterEntityPanelEffects,

	// target
	TargetEffects,
	CommentTargetEffects,
	FilesEffects,
	ImageEffects,
	ProjectTargetEffects,
	TagTargetEffects,
	TaskTargetEffects,
	VoteTargetEffects,

	// UI
	FeedbackDlgEffects,
];

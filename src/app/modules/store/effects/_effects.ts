import { AppErrorsEffects } from './misc/app-error.effects';
import { TaskEffects } from './entities/task.effects';
import { CountryEffects } from './entities/country.effects';
import { CurrencyEffects } from './entities/currency.effects';
import { AuthenticationEffects } from './misc/authentication.effects';
import { UserEffects } from '../../user/store/effects/user.effects';
import { SuppliersEffects } from '../../suppliers/store/effects/supplier.effects';
import { TeamMembersEffects } from './entities/team-members.effects';
import { CategoryEffects } from './entities/category.effects';
import { TokenEffects } from './misc/token.effects';
import { CustomFieldsEffects } from './entities/custom-fields.effects';
import { TagEffects } from './entities/tag.effects';
import { EventEffects } from './entities/event.effects';
import { FilterEntityPanelEffects } from './ui/filter-entity-panel.effects';
import { ProjectEffects } from './entities/project.effects';
import { PreloaderEffects } from './misc/preloader.effects';
import { CommentTargetEffects } from '../../comment/store/effects/comments.effects';
import { FilesTargetEffects } from './target/files.effects';
import { ImageTargetEffects } from './target/image.effects';
import { ProjectTargetEffects } from './target/project.effects';
import { TargetEffects } from './target/target.effects';
import { TagTargetEffects } from './target/tag.effects';
import { TaskTargetEffects } from './target/task.effects';
import { VoteTargetEffects } from './target/vote.effects';
import { TeamEffects } from './entities/team.effects';
import { FeedbackDlgEffects } from './ui/feedback-dlg.effects';
import { SnackBarEffects } from './ui/snack-bar.effects';

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

	// misc
	SnackBarEffects,
	AppErrorsEffects,
	AuthenticationEffects,
	TokenEffects,
	PreloaderEffects,
	FilterEntityPanelEffects,

	// target
	TargetEffects,
	CommentTargetEffects,
	FilesTargetEffects,
	ImageTargetEffects,
	ProjectTargetEffects,
	TagTargetEffects,
	TaskTargetEffects,
	VoteTargetEffects,

	// UI
	FeedbackDlgEffects
];

import { ProductEffects } from './entities/products.effects';
import { AppErrorsEffects } from './misc/app-error.effects';
import { SnackBarEffects } from './ui/snack-bar.effects';
import { TaskEffects } from './entities/task.effects';
import { DialogEffects } from './ui/dialog.effects';
import { CommentEffects } from './entities/comments.effects';
import { FilesEffects } from './entities/files.effects';
import { UserEffects } from './entities/user.effects';
import { CurrencyEffects } from './entities/currency.effects';
import { CountryEffects } from './entities/country.effects';
import { ImageEffects } from './entities/image.effects';
import { VoteEffects } from './entities/vote.effects';
import { AuthenticationEffects } from './misc/authentication.effects';
import { TokenEffects } from './misc/token.effects';
import { CustomFieldsEffects } from './entities/custom-fields.effects';
import { TeamMembersEffects } from './entities/team-members.effects';
import { CategoryEffects } from './entities/category.effects';
import { SuppliersEffects } from './entities/suppliers.effects';
import { EventEffects } from './entities/event.effects';
import { TagEffects } from './entities/tag.effects';
import { ProjectEffects } from './entities/project.effects';
import { PreloaderEffects } from './misc/preloader.effects';
import { TargetTagEffects } from './target/target-tag.effects';
import { TargetProjectEffects } from './target/target-project.effects';
import { FilterEntityPanelEffects } from './ui/filter-entity-panel.effects';


export const effects = [
	ProductEffects,
	AppErrorsEffects,
	SnackBarEffects,
	TaskEffects,
	CommentEffects,
	FilesEffects,
	ImageEffects,
	UserEffects,
	CountryEffects,
	CurrencyEffects,
	VoteEffects,
	AuthenticationEffects,
	TokenEffects,
	CustomFieldsEffects,
	TeamMembersEffects,
	CategoryEffects,
	SuppliersEffects,
	EventEffects,
	TagEffects,
	ProjectEffects,
	PreloaderEffects,
	TargetTagEffects,
	TargetProjectEffects,
	FilterEntityPanelEffects
];

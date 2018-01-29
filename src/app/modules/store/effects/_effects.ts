import { ProductEffects } from './entities/products.effects';
import { AppErrorsEffects } from './misc/app-error.effects';
import { SnackBarEffects } from './ui/snack-bar.effects';
import { TaskEffects } from './entities/task.effects';
import { CountryEffects } from './entities/country.effects';
import { CurrencyEffects } from './entities/currency.effects';
import { AuthenticationEffects } from './misc/authentication.effects';
import { UserEffects } from './entities/user.effects';
import { SuppliersEffects } from './entities/suppliers.effects';
import { TeamMembersEffects } from './entities/team-members.effects';
import { CategoryEffects } from './entities/category.effects';
import { TokenEffects } from './misc/token.effects';
import { CustomFieldsEffects } from './entities/custom-fields.effects';
import { TagEffects } from './entities/tag.effects';
import { EventEffects } from './entities/event.effects';
import { FilterEntityPanelEffects } from './ui/filter-entity-panel.effects';
import { ProjectEffects } from './entities/project.effects';
import { PreloaderEffects } from './misc/preloader.effects';
import { CommentSelectionEffects } from './selection/comments-selection.effects';
import { FilesSelectionEffects } from './selection/files.effects';
import { ImageSelectionEffects } from './selection/image.effects';
import { ProjectSelectionEffects } from './selection/project.selection.effects';
import { SelectionEffects } from './selection/selection.effects';
import { TagSelectionEffects } from './selection/tag-selection.effects';
import { TaskSelectionEffects } from './selection/task-selection.effects';
import { VoteSelectionEffects } from './selection/vote-selection.effects';


export const effects = [

	// entities
	ProductEffects,
	TaskEffects,
	UserEffects,
	CountryEffects,
	CurrencyEffects,
	CustomFieldsEffects,
	TeamMembersEffects,
	CategoryEffects,
	SuppliersEffects,
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

	// selection
	SelectionEffects,
	CommentSelectionEffects,
	FilesSelectionEffects,
	ImageSelectionEffects,
	ProjectSelectionEffects,
	TagSelectionEffects,
	TaskSelectionEffects,
	VoteSelectionEffects
];

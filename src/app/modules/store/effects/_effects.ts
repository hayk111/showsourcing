import { ProductEffects } from './products.effects';
import { AppErrorsEffects } from './app-error.effects';
import { SnackBarEffects } from './snack-bar.effects';
import { TaskEffects } from './task.effects';
import { DialogEffects } from './dialog.effects';
import { CommentEffects } from './comments.effects';
import { FilesEffects } from './files.effects';
import { UserEffects } from './user.effects';
import { CurrencyEffects } from './currency.effects';
import { CountryEffects } from './country.effects';
import { ImageEffects } from './image.effects';
import { VoteEffects } from './vote.effects';
import { AuthenticationEffects } from './authentication.effects';
import { TokenEffects } from './token.effects';


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
	TokenEffects
];

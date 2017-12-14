import { ProductEffects } from './products.effects';
import { AppErrorsEffects } from './app-error.effects';
import { SnackBarEffects } from './snack-bar.effects';
import { TaskEffects } from './task.effects';
import { DialogEffects } from './dialog.effects';
import { CommentEffects } from './comments.effects';
import { FilesEffects } from './app-files.effects';
import { UserEffects } from './user.effects';
import { CurrencyEffects } from './currency.effects';
import { CountryEffects } from './country.effects';


export const effects = [
	ProductEffects,
	AppErrorsEffects,
	SnackBarEffects,
	TaskEffects,
	CommentEffects,
	FilesEffects,
	UserEffects,
	CountryEffects,
	CurrencyEffects
];

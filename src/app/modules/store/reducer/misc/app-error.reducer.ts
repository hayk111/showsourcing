import { EntityState, entityInitialState } from '../../utils/entities.utils';
import { AppError } from '../../model/misc/app-error.model';



export function appErrorReducer(state: EntityState<AppError> = entityInitialState, action) {
	// well we do nothing here..
	// effects deal with side effects of adding errors,
	// we could save errors here but there is no real points in keeping those in memory.
	// or is there ? We could save error for remote debugging etc.. In any case it's easy to add.
}

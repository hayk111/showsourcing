import { ActionType } from '~comment/store/actions';
import { basicReducerFactory } from '~app/shared/entity';

export const commentReducer = basicReducerFactory(ActionType);

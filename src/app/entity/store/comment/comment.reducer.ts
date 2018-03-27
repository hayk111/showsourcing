import { commentActionType } from './comment.action';
import { entityReducerFactory } from '~entity/store/entity.reducer.factory';

export const commentReducer = entityReducerFactory(commentActionType);

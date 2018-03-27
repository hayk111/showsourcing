import { entityReducerFactory } from '~entity/store/entity.reducer.factory';
import { tagActionTypes } from './tag.action';

export const tagReducer = entityReducerFactory(tagActionTypes);

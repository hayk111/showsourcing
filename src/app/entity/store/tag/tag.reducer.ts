import { basicReducerFactory } from '~app/shared/entity/store/entity.reducer.factory';
import { tagActionTypes } from '~app/shared/entity/store/tag/tag.action';

export const tagReducer = basicReducerFactory(tagActionTypes);

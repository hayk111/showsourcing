import { basicReducerFactory } from '~app/shared/entity/store/entity.reducer.factory';
import { harbourActionTypes } from '~app/shared/harbour/harbour.action';

export const harbourReducer = basicReducerFactory(harbourActionTypes);

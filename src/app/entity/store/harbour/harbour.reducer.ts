import { entityReducerFactory } from '~entity/store/entity.reducer.factory';
import { harbourActionTypes } from './harbour.action';

export const harbourReducer = entityReducerFactory(harbourActionTypes);

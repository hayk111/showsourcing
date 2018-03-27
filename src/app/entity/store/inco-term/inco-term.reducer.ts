import { entityReducerFactory } from '~entity/store/entity.reducer.factory';
import { incoTermsActionTypes } from './inco-term.action';

export const incoTermReducer = entityReducerFactory(incoTermsActionTypes);

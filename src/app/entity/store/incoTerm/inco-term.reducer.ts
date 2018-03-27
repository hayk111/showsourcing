import { basicReducerFactory } from '~app/shared/entity/store/entity.reducer.factory';
import { incoTermsActionTypes } from '~app/shared/incoTerm/inco-term.action';

export const incoTermReducer = basicReducerFactory(incoTermsActionTypes);

import { entityReducerFactory } from '~entity/store/entity.reducer.factory';
import { customFieldsActionTypes } from './custom-fields.action';


export const customFieldReducer = entityReducerFactory(customFieldsActionTypes);

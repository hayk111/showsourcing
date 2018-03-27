import { basicReducerFactory } from '~app/shared/entity/store/entity.reducer.factory';
import { customFieldsActionTypes } from './custom-fields.action';


export const customFieldReducer = basicReducerFactory(customFieldsActionTypes);

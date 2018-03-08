import { ActionType } from './supplier.action';
import { basicReducerFactory } from '~store';

export const supplierReducer = basicReducerFactory(ActionType);

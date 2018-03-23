import { basicReducerFactory } from '~store';

import { actionType } from '../actions';

export const taskReducer = basicReducerFactory(actionType);

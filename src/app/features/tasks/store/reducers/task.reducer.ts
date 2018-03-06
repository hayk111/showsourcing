import { basicReducerFactory } from '~store';

import { ActionType } from '../actions';

export const taskReducer = basicReducerFactory(ActionType);

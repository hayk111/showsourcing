import { fileActionType } from './file.action';
import { basicReducerFactory } from '~store';

export const fileReducer = basicReducerFactory(fileActionType);

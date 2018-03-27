import { fileActionType } from './file.action';
import { entityReducerFactory } from '~entity/store/entity.reducer.factory';

export const fileReducer = entityReducerFactory(fileActionType);

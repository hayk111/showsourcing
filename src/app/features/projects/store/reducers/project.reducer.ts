import { EntityState } from '~entity';
import { Project } from './../../models/project.model';
import { ActionType } from '../actions';
import { basicReducerFactory } from '~entity';

export const projectReducer = basicReducerFactory(ActionType);

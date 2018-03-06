import { EntityState } from '~entity';
import { Project } from './../../models/project.model';
import { ActionType } from '../actions';
import { basicReducerFactory } from '~store';

export const projectReducer = basicReducerFactory(ActionType);

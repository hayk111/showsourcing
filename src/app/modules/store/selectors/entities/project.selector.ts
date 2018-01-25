import { createSelector } from 'reselect';
import { EntityTarget } from '../../utils/entities.utils';



export const selectProjectsForTarget = state => state.target.projects;

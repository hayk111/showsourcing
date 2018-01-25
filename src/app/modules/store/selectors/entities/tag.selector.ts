
import { createSelector } from 'reselect';
import { EntityTarget } from '../../utils/entities.utils';



export const selectTagsForTarget = state => state.target.tags;

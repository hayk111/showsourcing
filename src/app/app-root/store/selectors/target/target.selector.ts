import { createSelector } from 'reselect';
import { entityStateToArray } from '~entity/utils';

import { Vote } from '../../model/entities/vote.model';

export const selectCurrentTarget = state => state.foccussedEntity.currentTarget;

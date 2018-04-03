import { makeEntityBundle } from '~app/entity/store/entity-bundle';
import { ERM } from '../entity.model';

export const fromTeamMember = makeEntityBundle(ERM.teamMember.entityName);

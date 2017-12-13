import { EntityTarget } from '../utils/entities.utils';


export interface AppFile extends File {
	id: string;
	pending: boolean;
	target: EntityTarget;
}

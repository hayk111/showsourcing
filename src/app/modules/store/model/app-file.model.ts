import { EntityTarget } from '../utils/entities.utils';


export interface AppFile {
	id?: string;
	pending?: boolean;
	target: EntityTarget;
	file?: File;
	name?: string;
}

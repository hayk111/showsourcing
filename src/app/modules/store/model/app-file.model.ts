import { EntityTarget } from '../utils/entities.utils';


export interface AppFile {
	id?: string;
	pending?: boolean;
	progress?: number;
	target: EntityTarget;
	file?: File;
	fileName?: string;
	creationDate?: number;
	createdByUserId?: string;
	data?: any;
}

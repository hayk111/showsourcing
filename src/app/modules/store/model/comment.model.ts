import { EntityTarget } from '../utils/entities.utils';


export interface AppComment {
	createdByUserId?: string;
	creationDate?: number;
	entityCounter?: number;
	id?: string;
	lastModifiedDate?: number;
	lastUpdatedByUserId?: string;
	linkedToParent?: boolean;
	modificationCounterText?: number;
	teamId?: string;
	text: string;
	pending?: boolean;
	pendingUuid?: number;
	target: EntityTarget;
}

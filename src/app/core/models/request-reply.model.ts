import { ID, uuid } from '~utils';
import { ExtendedField } from './extended-field.model';
import { AppImage } from './app-image.model';
import { Attachment } from './attachment.model';


export enum ReplyStatus {
	PENDING = 'pending',
	REPLIED = 'replied',
	ERROR = 'error',
	REFUSED = 'refused',
	RESENT = 'resent',
	VALIDATED = 'validated',
}

export const DEFAULT_REPLIED_STATUS = ReplyStatus.REPLIED;

export class RequestReply {
	id?: ID;
	message?: string;
	status?: ReplyStatus;
	fields?: ExtendedField[];
	images?: AppImage[];
	attachments?: Attachment[];
	__typename?= 'RequestReply';

	constructor(config: RequestReplyConfig) {
		if (!config.id) this.id = uuid();
		Object.assign(this, config);
	}
}

export interface RequestReplyConfig {
	id?: ID;
	message?: string;
	status?: ReplyStatus;
}

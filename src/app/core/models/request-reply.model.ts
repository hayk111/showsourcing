import { ID, uuid } from '~utils';
import { ExtendedField } from './extended-field.model';

export class RequestReply {
	id: ID;
	message: string;
	status: string;
	fields: ExtendedField[];
	__typename?= 'RequestReply';

	constructor(config: RequestReplyConfig) {
		if (!config.id) this.id = uuid();
		Object.assign(this, config);
	}
}

export interface RequestReplyConfig {
	id?: ID;
	message?: string;
	status?: string;
}

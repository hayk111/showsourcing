import { Quote } from '~core/erm/models/quote.model';
import { Supplier } from '~core/erm/models/supplier.model';
import { RequestStatus } from '~utils';

import { EntityWithAudit } from './_entity.model';
import { AppImage } from './app-image.model';

export class ExternalRequest extends EntityWithAudit<ExternalRequestConfig> {
	name: string;
	description?: string;
	companyName?: string;
	quotes: Quote[];
	descriptor: string;
	targetedMOQ?: number;
	status: RequestStatus;
	supplier: Supplier;
	recipients: string[];
	images: AppImage[];
	__typename?= 'ExternalRequest';

	constructor(config: ExternalRequestConfig) {
		super(config);
		this.status = RequestStatus.PENDING;
	}
}

export interface ExternalRequestConfig {
	name: string;
	descriptor: string;
	description?: string;
	companyName?: string;
	targetedMOQ?: number;
	recipients: string[];
	supplier?: Supplier;
	quotes: Quote[];
	images?: AppImage[];
}

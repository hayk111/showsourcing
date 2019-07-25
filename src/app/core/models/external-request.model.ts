import { Quote } from '~models/quote.model';
import { Supplier } from '~models/supplier.model';

import { EntityWithAudit } from './_entity.model';
import { AppImage } from './app-image.model';
import { RequestStatus } from './supplier-request.model';

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
	__typename ?= 'ExternalRequest';

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

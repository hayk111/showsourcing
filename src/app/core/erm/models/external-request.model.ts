import { Quote } from '~core/erm/models/quote.model';
import { Supplier } from '~core/erm/models/supplier.model';
import { RequestStatus } from '~utils';

import { Entity } from './_entity.model';
import { AppImage } from './app-image.model';

export class ExternalRequest extends Entity<ExternalRequest> {
	name?: string;
	description?: string;
	companyName?: string;
	quotes?: Quote[];
	descriptor?: string;
	targetedMOQ?: number;
	status?: RequestStatus = RequestStatus.PENDING;
	supplier?: Supplier;
	recipients?: string[];
	images?: AppImage[];
	__typename ?= 'ExternalRequest';
}

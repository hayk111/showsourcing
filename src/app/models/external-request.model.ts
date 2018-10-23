import { Quote } from '~models/quote.model';
import { Supplier } from '~models/supplier.model';
import { AppImage } from './app-image.model';
import { EntityWithAudit } from './_entity.model';

export class ExternalRequest extends EntityWithAudit<ExternalRequestConfig> {
	name: string;
	description?: string;
	companyName?: string;
	quotes: Quote[];
	descriptor: string;
	targetedMOQ?: number;
	status: string; // possible values: pending, replied, busy, resent, declined, validated
	supplier: Supplier;
	recipients: string[];
	images: AppImage[];
	__typename ?= 'ExternalRequest';

}

export interface ExternalRequestConfig {
	name: string;
	description?: string;
	companyName?: string;
	targetedMOQ?: number;
	recipients?: string[];
	supplier?: Supplier;
}

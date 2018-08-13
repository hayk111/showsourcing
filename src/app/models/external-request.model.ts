import { Supplier } from '~models/supplier.model';
import { Quote } from '~models/quote.model';
import { BaseEntity } from '~models/_entity.model';

export class ExternalRequest extends BaseEntity<ExternalRequestConfig> {
	name: string;
	description?: string;
	companyName?: 'string?';
	quotes: Quote[];
	descriptor: string;
	targetedMOQ?: number;
	status: string; // possible values: pending, replied, busy, resent, declined, validated
	supplier: Supplier;
	recipients: string[];
}

export interface ExternalRequestConfig {
	name: string;
	description?: string;
	companyName?: 'string?';
}
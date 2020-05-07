import { Typename } from '../typename.type';
import { Entity } from './_entity.model';

export class Export extends Entity<Export> {
	__typename?: Typename = 'Export';
	id?: string;
	teamId?: string;
	format?: ExportFormat;
	target?: ExportTarget | null;
	options?: string | null;
	query?: string | null;
	status?: ExportStatus;
	documentUrl?: string | null;
	errors?: Array<string | null> | null;
}


export enum ExportFormat {
	XLS = 'XLS',
	PDF = 'PDF',
	IMAGE = 'IMAGE'
}

export enum ExportTarget {
	SUPPLIER = 'SUPPLIER',
	PRODUCT = 'PRODUCT',
	CONTACT = 'CONTACT',
	SAMPLE = 'SAMPLE'
}

export enum ExportStatus {
	PENDING = 'PENDING',
	PROCESSING = 'PROCESSING',
	READY = 'READY',
	ERROR = 'ERROR'
}


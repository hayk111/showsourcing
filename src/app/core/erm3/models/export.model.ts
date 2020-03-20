import { ExportFormat, ExportStatus, ExportTarget } from '../../../../../generated/API.service';
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

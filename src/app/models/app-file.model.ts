import { BaseEntity } from './_entity.model';

export class AppFile extends BaseEntity<AppFile> {
	fileName: string;
	deleted: boolean;
}

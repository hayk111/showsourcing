import { Entity } from './_entity.model';

export class AppFile extends Entity<AppFile> {
	fileName: string;
	deleted: boolean;
}
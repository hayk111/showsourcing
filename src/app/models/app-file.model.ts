import { BaseEntity } from './_entity.model';

export class AppFile extends BaseEntity<AppFileConfig> {
	fileName: string;
	deleted: boolean;
}

export interface AppFileConfig {
	fileName: string;
}

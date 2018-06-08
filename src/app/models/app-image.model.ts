import { BaseEntity } from './_entity.model';

export class AppImage extends BaseEntity<AppImageConfig> {
	fileName: string;
	orientation: number;
	imageType: string;
	deleted: boolean;
}

export interface AppImageConfig {
	fileName: string;
}

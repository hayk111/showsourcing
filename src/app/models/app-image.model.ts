import { BaseEntity } from './_entity.model';

export class AppImage extends BaseEntity<AppImageConfig> {
	fileName: string;
	orientation = 0;
	imageType = 'Photo';
	deleted = false;
	constructor(config?: AppImageConfig) {
		super(config);
		this.fileName = `${this.id}.jpg`;
	}

}

export interface AppImageConfig {
	fileName: string;
}

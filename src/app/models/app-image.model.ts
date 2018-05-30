import { BaseEntity } from './_entity.model';

export class AppImage extends BaseEntity<AppImage> {
	fileName: string;
	orientation: number;
	imageType: string;
	deleted: boolean;
}

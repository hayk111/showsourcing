import { Entity } from './_entity.model';

export class AppImage extends Entity<AppImage> {
	fileName: string;
	orientation: number;
	imageType: string;
	deleted: boolean;
}
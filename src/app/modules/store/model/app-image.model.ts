import { AppFile } from './app-file.model';

export interface AppImage extends AppFile {
	id: string;
	fileName: string;
	imageType: string;
	creationDate: number;
	createdByUserId: string;
	orientation: number;
	// client side rotation
	rotation: number;
	urls: {
		url_60x45: string;
		url_120x90: string;
		url_220x165: string;
		url_400x300: string;
		url_600x450: string;
		url_1000x1000: string;
	};
	linkedToParent: boolean;
	mainImage: boolean;
}

import { AppFile } from './app-file.model';

export class AppImage extends AppFile {
	imageType: string;
	// base64 representation of the image when the img isn't uploaded yet
	data: string;
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

	constructor(file: File, userId: string) {
		super(file, userId);
	}

	// since reading the data is async we can use a promise here to return a new instance
	static async newInstance(file: File, userId: string): Promise<AppImage> {
		const img = new AppImage(file, userId);
		img.data = await AppImage.convertFileToBase64(file);
		return img;
	}

	static convertFileToBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				resolve((e.target as any).result);
			};
			reader.readAsDataURL(file);
		});
	}
}
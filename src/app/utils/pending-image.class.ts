import { uuid } from '~utils/uuid.utils';

/** class that represent an image that is not yet fully uploaded.
 * That lets us display it with a base64 version of the file
 */
export class PendingImage {
	data: string;
	id = uuid();
	readonly pending = true;

	constructor(private file: File) {

	}

	async createData() {
		this.data = await this.fileToBase64(this.file);
		return this;
	}

	fileToBase64(file: File): Promise<any> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				resolve((e.target as any).result);
			};
			reader.readAsDataURL(file);
		});
	}
}

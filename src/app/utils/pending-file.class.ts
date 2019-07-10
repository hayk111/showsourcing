import { uuid } from './uuid.utils';

/** class that represent a file that is in the process of being uploaded.
 * That lets us display the filename with a spinner to let the user know
 * that the file is currently being processed
 */
export class PendingFile {
	id = uuid();
	fileName;
	size;
	readonly pending = true;

	constructor(private file: File) {
		this.fileName = file.name;
		this.size = file.size;
	}
}

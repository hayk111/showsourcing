


export interface PendingFile {
	pending: true;
	fileName: string;
}

export interface PendingImage {
	pending: true;
	data$: Promise<string>;
}

import { Observable } from 'rxjs';
import { Attachment, Image } from '~core/erm3';


export interface ObservableFileUpload extends Observable<Attachment[]> {
	onTempFiles: (fn: (attachments: Attachment[]) => any) => Observable<Attachment[]>;
}

export interface ObservableImageUpload extends Observable<Image[]> {
	onTempImages: (fn: (images: Image[]) => any) => Observable<Image[]>;
}
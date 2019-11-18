import { Observable, throwError } from 'rxjs';

export function resizeSizeToLimit(
	file: File,
	limitSize: number = 1200,
	resizeDoneFunc?: any
): Observable<File> {
	const resultObservable = new Observable<File>(observer => {
		let newFile;
		const reader = new FileReader();
		reader.onload = (e: any) => {
			const img = new Image();
			img.src = e.target.result;

			img.onload = () => {
				if (img.width > limitSize || img.height > limitSize) {
					const ratio = img.width / img.height;
					const elem = document.createElement('canvas');
					if (img.width > img.height) {
						elem.width = limitSize;
						elem.height = limitSize / ratio;
					} else {
						elem.height = limitSize;
						elem.width = limitSize * ratio;
					}
					const ctx = elem.getContext('2d');
					ctx.drawImage(img, 0, 0, elem.width, elem.height);
					ctx.canvas.toBlob(
						blob => {
							newFile = new File([blob], file.name, {
								type: file.type,
								lastModified: Date.now()
							});
							observer.next(newFile);
							observer.complete();
						},
						file.type,
						1
					);
				} else {
					observer.next(file);
					observer.complete();
				}
			};
		};
		reader.readAsDataURL(file);
	});
	return resultObservable;
}

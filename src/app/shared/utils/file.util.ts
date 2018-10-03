


import { Observable, throwError } from 'rxjs';

export function resizeSizeToLimit(file: File, limit: number = 1000000, resizeDoneFunc?: any ): Observable<File> {
	const resultObservable = new Observable<File>((observer) => {
		if (file.size > limit) {
			let newFile = null;
      const newImageDiffRatio = 1 - ((file.size - limit) / file.size);
			const reader  = new FileReader();
			reader.onload = (e: any) => {
				const img = new Image();
				img.src = e.target.result;
				img.onload = () => {
					const elem = document.createElement('canvas');
					const newWidth = img.width * newImageDiffRatio;
					const newHeight = img.height * newImageDiffRatio;
					elem.width = newWidth;
					elem.height = newHeight;

					const ctx = elem.getContext('2d');
					ctx.drawImage(img, 0, 0, newWidth, newHeight);
					ctx.canvas.toBlob((blob) => {
						newFile = new File([blob], file.name, {
							type: file.type,
							lastModified: Date.now()
            });

			    observer.next(newFile);
			    observer.complete();
					}, file.type, 1);
				};
			};
			reader.readAsDataURL(file);
		} else {
			observer.next(file);
			observer.complete();
		}
	});
	return resultObservable;
}

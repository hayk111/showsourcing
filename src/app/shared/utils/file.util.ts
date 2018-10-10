import { Observable, throwError } from 'rxjs';

export function resizeSizeToLimit(
  file: File,
  limitSize: number = 1200,
  resizeDoneFunc?: any
): Observable<File> {
  const resultObservable = new Observable<File>(observer => {
    let newFile;
    const newImageDiffRatio = 1 - (file.size - limitSize) / file.size;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        if (img.width > limitSize || img.height > limitSize) {
          const ratio = img.width / img.height;
          let newWidth = img.width;
          let newHeight = img.height;
          if (newWidth > newHeight) {
            newWidth = limitSize;
            newHeight = limitSize * ratio;
          } else {
            newHeight = limitSize;
            newWidth = limitSize * ratio;
          }
          const elem = document.createElement('canvas');
          newWidth = img.width * newImageDiffRatio;
          newHeight = img.height * newImageDiffRatio;
          elem.width = newWidth;
          elem.height = newHeight;

          const ctx = elem.getContext('2d');
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
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
          observer.next(newFile);
          observer.complete();
        }
      };
    };
    reader.readAsDataURL(file);
  });
  return resultObservable;
}

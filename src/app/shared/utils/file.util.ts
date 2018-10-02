
export function resizeSizeToLimit(file: File, limit: number = 1000000, resizeFunc?: any ) {
  if (file.size > limit) {
    const newImageDiffRatio = 1 - ((file.size - limit) / file.size);
    const reader  = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      const canvasCopy = document.createElement('canvas');
      const copyContext = canvasCopy.getContext('2d');

      img.onload = function()
      {
          const elem = document.createElement('canvas');
          const ctx = elem.getContext('2d');
          canvasCopy.width = img.width * newImageDiffRatio;
          canvasCopy.height = img.height * newImageDiffRatio;
          copyContext.drawImage(img, 0, 0);

          canvas.width = img.width * ratio;
          canvas.height = img.height * ratio;
          ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
      };

      img.src = reader.result;
    }
    reader.readAsDataURL(file);
  }
  if (resizeFunc) {
    return resizeFunc(file);
  }
  return file;
}


export function resizeSizeToLimit(file: File, limit: number = 1000000, resizeFunc?: any ) {
  if (file.size > limit) {
    
  }
  if (resizeFunc) {
    return resizeFunc(file);
  }
  return file;
}
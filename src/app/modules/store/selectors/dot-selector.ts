
export const dotSelector = (path: string) => state => {
	const pathArr = path.split('.');
	let target = state;
	pathArr.forEach(p => target = target[p]);
	return target;
}
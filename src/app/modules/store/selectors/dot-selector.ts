
export const dotSelector = (path: string) => (state): any => {
	const pathArr = path.split('.');
	let target = state;
	pathArr.forEach(p => target = target[p]);
	return target;
};

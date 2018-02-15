
// no need for something fancier than that,
// Real uuids aren't needed here because this is used when
// a new entity is created. Date.now() should suffice.
export function uuid() {
	return '' + Math.random() + '' + Date.now();
}

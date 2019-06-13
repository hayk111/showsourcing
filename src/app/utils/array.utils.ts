export function isArray(item) {
	// we could use Array.isArray(item) but for compatibility we use this
	return Object.prototype.toString.call(item) === '[object Array]';
}

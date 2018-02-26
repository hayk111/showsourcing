
// seems like this is about 8x faster than JSON.parse(JSON.stringify(o))
// this could be preemptive optimization but since it's used a lot on large collections...
// + I didn't write it.
// https://jsperf.com/deep-copy-vs-json-stringify-json-parse/5
export const deepCopy = (o: any) => {
	let newO;
	let i;

	if (typeof o !== 'object') {
		return o;
	}
	if (!o) {
		return o;
	}

	if ('[object Array]' === Object.prototype.toString.apply(o)) {
		newO = [];
		for (i = 0; i < o.length; i += 1) {
			newO[i] = deepCopy(o[i]);
		}
		return newO;
	}

	newO = {};
	for (i in o) {
		if (o.hasOwnProperty(i)) {
			newO[i] = deepCopy(o[i]);
		}
	}
	return newO;
};


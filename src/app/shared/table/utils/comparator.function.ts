

// https://github.com/swimlane/ngx-datatable/blob/master/src/utils/sort.ts
export function defaultComparator(a: any, b: any): number {
	if (a === null || typeof a === 'undefined') a = 0;
	if (b === null || typeof b === 'undefined') b = 0;

	if (a instanceof Date && b instanceof Date) {
		if (a < b) return -1;
		if (a > b) return 1;
	} else if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
		// Convert to string in case of a=0 or b=0
		a = String(a);
		b = String(b);
		// Isn't a number so lowercase the string to properly compare
		if (a.toLowerCase() < b.toLowerCase()) return -1;
		if (a.toLowerCase() > b.toLowerCase()) return 1;
	} else {
		// Parse strings as numbers to compare properly
		if (parseFloat(a) < parseFloat(b)) return -1;
		if (parseFloat(a) > parseFloat(b)) return 1;
	}

	// equal each other
	return 0;
}


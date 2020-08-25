import * as v4 from 'uuid/v4';

export function uuid() {
	return v4();
}

export function isUuid(str: string) {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
}

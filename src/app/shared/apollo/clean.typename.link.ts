import { ApolloLink } from 'apollo-link';

export const cleanTypenameLink = new ApolloLink((operation, forward) => {
	debugger;
	if (operation.variables) {
		operation.variables = omitDeep(operation.variables, "__typename")
	}
	return forward(operation).map((data) => {
		return data;
	})
})

function omitDeep(obj, key) {
	const keys: Array<any> = Object.keys(obj);
	const newObj: any = {};
	keys.forEach((i: any) => {
		if (i !== key) {
			const val: any = obj[i];
			if (val instanceof Date) newObj[i] = val;
			else if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key);
			else if (typeof val === 'object' && val !== null) newObj[i] = omitDeep(val, key);
			else newObj[i] = val;
		}
	});
	return newObj;
}

function omitDeepArrayWalk(arr, key) {
	return arr.map((val) => {
		if (Array.isArray(val)) return omitDeepArrayWalk(val, key)
		else if (typeof val === 'object') return omitDeep(val, key)
		return val
	})
}
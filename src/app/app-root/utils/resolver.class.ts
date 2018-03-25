// This is used to get a nested property in an object via string
// example:

// let example = { a: {b: 4}}
// console.log(example['a.b']); // undefined
// console.log(Resolver.resolve('a.b', example)) // 4
export class Resolver {

	static resolve(path: string, obj: any) {
		return path.split('.').reduce((prev, curr) => {
			return prev ? prev[curr] : undefined;
		}, obj);
	}

	/** so we can update value of an object given a nested string ('a.b.c.d') read above for more details */
	static patch(path: string, obj: any, value: any) {

		const pathArr = path.split('.');
		const accessedProperty = pathArr.pop();
		if (pathArr.length < 1) {
			obj[accessedProperty] = value;
		} else {
			const nested = Resolver.resolve(pathArr.join('.'), obj);
			nested[accessedProperty] = value;
		}

		return obj;
	}

	// create will transform a path 'a.b.c' into a real object { a: {b: {c: value }}
	static create(path: string, value: any) {
		const reversedPath = path.split('.').reverse();
		const iter = ([head, ...tail], val) => {
			if (!head) {
				return val;
			}
			const newObj = { [head]: val };
			return iter(tail, newObj);
		};
		return iter(reversedPath, value);
	}
}

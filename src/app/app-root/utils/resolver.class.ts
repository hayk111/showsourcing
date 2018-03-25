// This is used to get a nested property in an object via string
// example:

// let example = { a: {b: 4}}
// console.log(example['a.b']); // undefined
// console.log(Resolver.resolve('a.b', example)) // 4
export class Resolver {

	static resolve(path: string, obj: any) {
		return path.split('.').reduce((prev, curr) => {
			return prev ? prev[curr] : undefined;
		}, obj || self);
	}

	/** so we can update value of an object given a nested string ('a.b.c.d') read above for more details */
	static patch(path: string, obj: any, value) {

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
}

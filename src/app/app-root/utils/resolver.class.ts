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

	static patch(path: string, obj: any, value) {
		return path.split('.').reduce((prev, curr) => {
			return prev ? prev[curr] : undefined;
		}, obj || self);
	}
}

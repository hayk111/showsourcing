// LOAD, ADD, PATCH, MERGE

export function makeActions(type: string) {
// using uppercase for backward compatibility with enums
	return {
		LOAD: `[${type}]`,
		ADD: `[${type}]`,
		PATCH: `[${type}]`,
		MERGE: `[${type}]`,
	};
}

// this is for when we can reuse things in the actions.

function reuse(name: string) {
	const actionTypes = createActionsTypes(name);
}

function createActionsTypes(name: string) {
	return {
		load: `[${name}] loading`,
		set: `[${name}] setting`,
		add: `[${name}] adding`,
		remove: `[${name}] removing`,
		setPending: `[${name}] setting pending`
	};
}

function createActions(actionTypes) {
	Object.entries(actionTypes)
}


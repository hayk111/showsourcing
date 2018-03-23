export const actionType = {
	ADD: '[Error] Add',
};

export const appErrorActions = {
	add: (e: Error) => {
		return {
			type: actionType.ADD,
			payload: e,
		};
	},
};

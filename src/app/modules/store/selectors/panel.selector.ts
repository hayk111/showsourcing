

export const selectProp = (panelName, propName) => state => {
	if (state[panelName] === undefined)
		throw Error(`panel ${panelName} is not defined, please define it in the store initial state`);
	if (state[panelName][propName] === undefined)
		throw Error(`property ${propName} for panel ${panelName} is not defined, please define it in the store initial state
		or use NULL for if you need a non defined value instead of undefined`);
	return state[panelName][propName];
};

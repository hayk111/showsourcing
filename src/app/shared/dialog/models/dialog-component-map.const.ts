
export const dialogComponentMap = {};

export function addDialog(component, name: string) {
	if (dialogComponentMap[name])
		throw Error(`component with name ${name}, has already been added to the map. Find another name`);
	dialogComponentMap[name] = component;
}


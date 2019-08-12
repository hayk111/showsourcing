import { DynamicField } from '~shared/dynamic-forms';

export abstract class AbstractDescriptorComponent {

	protected _descriptor: DynamicField[];
	get descriptor() {
		return this._descriptor;
	}

	constructor() { }

	/**
	 * returns an orderded descriptor only taking into account the order and names that match inside the array only. o
	 * @param only string array containing the name of the attributes of the entity that we want to filter
	 */
	getOnly(only: string[]) {
		if (only && only.length) {
			const orderedDescriptor = only.reduce((acc, val) => {
				const descriptorFound = this._descriptor.find(item => item.name === val);
				if (descriptorFound) {
					acc.push(descriptorFound);
				}
				return acc;
			}, []);
			this._descriptor = [...orderedDescriptor];
		}

		return this._descriptor;
	}

	/**
	 * modifies current descriptor by overriding the old values with the new ones, only if the new ones are valid
	 * @param newValue value that we want to modify with the descriptor
	 */
	modify(newValues: DynamicField[]) {
		this.itemsAreValid(newValues);
		const modifiedDescriptor = this._descriptor.map(item => {
			let currentValue = item;
			// if the name is the same that means that we have to udpate
			const updatedValue = newValues.find(value => value.name === item.name && item.type !== 'title');
			if (updatedValue) {
				if (updatedValue.metadata && currentValue.metadata) {
					currentValue = ({
						...currentValue,
						...updatedValue,
						metadata: { ...currentValue.metadata, ...updatedValue.metadata }
					});
				} else {
					currentValue = ({
						...currentValue,
						...updatedValue
					});
				}
			}
			return currentValue;
		});

		this._descriptor = [...modifiedDescriptor];
	}

	/**
	 * inserts a valid new value, above a given existing name inside the descriptor
	 * @param newValue value that we want to add to the descriptor
	 * @param name name where we are going to insert the new value
	 */
	insert(newValue: DynamicField, name: string) {
		this.itemsAreValid([newValue], 'insert to');
		// if the index
		const indexToInsert = this._descriptor.findIndex(item => item.name === name);
		if (indexToInsert === -1)
			throw Error(`there is no name on the descriptor with name ${name} to insert new value`);

		// we insert the new value
		this._descriptor.splice(indexToInsert, 0, newValue);
	}

	/**
	 * checks if the items have the property name, otherwise throws an error
	 * @param items items to check
	 * @param action name of the action we are performing to display on the error
	 */
	private itemsAreValid(items: DynamicField[], action = 'modify') {
		const hasEmptyName = items.some(item => !item.name);
		if (hasEmptyName)
			throw Error(`the values that you are using to modify the descriptor, do not have the property 'name'`);
	}

}

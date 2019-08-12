import { DynamicField } from '~shared/dynamic-forms';

export abstract class AbstractDescriptorComponent {

	descriptor: DynamicField[];

	constructor() { }

	/**
	 * returns a full descriptor except the names that match in the excpetion array
	 * @param exception array containing the name of the attributes of the entity that we want to filter
	 */
	getAll(exception?: string[]) {
		const filteredDescriptor = exception ?
			this.descriptor.filter(item => !(exception.includes(item.name))) :
			this.descriptor;
		return filteredDescriptor;
	}

	/**
	 * returns a descriptor only taking into account the names that match inside the array only
	 * @param only string array containing the name of the attributes of the entity that we want to filter
	 */
	getOnly(only: string[]) {
		const filteredDescriptor = this.descriptor.filter(item => only.includes(item.name));
		return filteredDescriptor;
	}

	/**
	 * modifies current descriptor by overriding the old values with the new ones, only if the new ones are valid
	 * @param newValue value that we want to modify with the descriptor
	 */
	modify(newValues: DynamicField[]) {
		this.itemsAreValid(newValues);
		const modifiedDescriptor = this.descriptor.map(item => {
			let updateDescriptor = item;
			// if the name is the same that means that we have to udpate
			const index = newValues.findIndex(value => value.name === item.name);
			if (index !== -1) {
				updateDescriptor = ({ ...updateDescriptor, ...newValues[index] });
			}
			return updateDescriptor;
		});

		this.descriptor = [...modifiedDescriptor];
	}

	/**
	 * inserts a valid new value, above a given existing name inside the descriptor
	 * @param newValue value that we want to add to the descriptor
	 * @param name name where we are going to insert the new value
	 */
	insert(newValue: DynamicField, name: string) {
		this.itemsAreValid([newValue], 'insert to');
		// if the index
		const indexToInsert = this.descriptor.findIndex(item => item.name === name);
		if (indexToInsert === -1)
			throw Error(`there is no name on the descriptor with name ${name} to insert new value`);

		// we insert the new value
		this.descriptor.splice(indexToInsert, 0, newValue);
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

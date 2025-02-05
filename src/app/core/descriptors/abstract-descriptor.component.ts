import { DynamicField } from '~shared/dynamic-forms';

export abstract class AbstractDescriptorComponent {

	protected _descriptor: DynamicField[];
	get descriptor() {
		return this._descriptor;
	}

	protected blankField: DynamicField = { name: 'blank' };

	constructor() { }

	/**
	 * returns an orderded descriptor only taking into account the order and names that match inside the array only. o
	 * @param fields string array containing the name of the attributes of the entity that we want to filter
	 */
	protected pickFields(fields: string[]) {
		if (fields && fields.length) {
			const orderedDescriptor = fields.reduce((acc, val) => {
				const descriptorFound = this._descriptor.find(item => item.name === val);
				if (descriptorFound) {
					acc.push(descriptorFound);
				}
				return acc;
			}, []);
			// if we got any match with the only string array we override the descriptor
			if (orderedDescriptor.length)
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
			// if the name is the same that means that we have to udpate, we don't take into account type titles
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
		// we find the index matching the names and we don't take into account type title
		const indexToInsert = this._descriptor.findIndex(item => item.name === name && item.type !== 'title');
		if (indexToInsert === -1)
			throw Error(`there is no name on the descriptor with name ${name} to insert new value`);

		// we insert the new value
		this._descriptor.splice(indexToInsert, 0, newValue);
	}

	/**
	 * inserts a blank descriptor that is not displayed, above a given existing name inside the descriptor
	 * its used when we have more than 1 column and we want to distribute the items in a certain way
	 * @param name name where we are going to insert the new value
	 */
	insertBlank(name: string) {
		this.insert(this.blankField, name);
	}

	/**
	 * checks if the items have the property name, otherwise throws an error
	 * @param items items to check
	 * @param action name of the action we are performing to display on the error
	 */
	private itemsAreValid(items: DynamicField[], action = 'modify') {
		const hasEmptyName = items.some(item => !item.name);
		if (hasEmptyName)
			throw Error(`the values that you are using to ${action} the descriptor, do not have the property 'name'`);
	}

}

import { DynamicField } from "~shared/dynamic-forms";
import { AbstractDescriptorComponent } from "./abstract-descriptor.component";

export class TestDescriptor extends AbstractDescriptorComponent {
	name: DynamicField = { name: "name", type: "text" };
	sample: DynamicField = {
		name: "sample",
		type: "boolean",
		label: "Sample available"
	};
	category: DynamicField = {
		name: "category",
		type: "selector",
		label: "category",
		metadata: {
			canCreate: true,
			hasBadge: false,
			placeholder: "choose category"
		}
	};

	emptyField = this.blankField;

	// WARN: if more fields are added, some test won't work, since they depend on the order and quantity of items inside here
	protected _descriptor: DynamicField[] = [
		this.name,
		this.sample,
		this.category
	];

	constructor(only?: string[]) {
		super();
		this.pickFields(only);
	}
}

xdescribe("EntityDescriptors", () => {
	let testDesc: TestDescriptor;

	beforeEach(() => {
		testDesc = new TestDescriptor();
	});

	// pickFields
	it('should filter and order the descriptor leaving only the items that match the keys ("name"), given a set of strings', () => {
		testDesc = new TestDescriptor(["sample", "name"]);
		expect(testDesc.descriptor).toEqual([testDesc.sample, testDesc.name]);
		testDesc = new TestDescriptor(["sample", "doesntExist"]);
		expect(testDesc.descriptor).toEqual([testDesc.sample]);
	});

	it("descriptor should stay the same when all set of string given does not match with the current descriptor", () => {
		const oldDescriptor = [...testDesc.descriptor];
		testDesc = new TestDescriptor(["hey", "we", "dont", "exist"]);
		expect(testDesc.descriptor).toEqual(oldDescriptor);
	});

	// modify
	it('should modify the descriptor, given a set of DynamicField for any item on this set has matching key ("name")', () => {
		const newName = {
			...testDesc.name,
			metadata: { placeholder: "I didnt have placeholder before" }
		};
		const newSample = { ...testDesc.sample, label: "new sample label" };
		const newCategory = {
			...testDesc.category,
			metadata: {
				...testDesc.category.metadata,
				placeholder: "choose new category"
			}
		};

		testDesc.modify([
			{
				name: "name",
				metadata: { placeholder: "I didnt have placeholder before" }
			},
			{ name: "sample", label: "new sample label" },
			{ name: "category", metadata: { placeholder: "choose new category" } }
		]);
		expect(testDesc.descriptor).toEqual([newName, newSample, newCategory]);
	});

	it('should throw error when modifying the descriptor with a set of Dynamic field where at least 1 has no key ("name"', () => {
		expect(() =>
			testDesc.modify([
				{
					name: "name",
					metadata: { placeholder: "I didnt have placeholder before" }
				},
				{ label: "new sample label" },
				{ name: "category", metadata: { placeholder: "choose new category" } }
			])
		).toThrowError(Error);
	});

	// insert
	it('should insert a Dynamic field above a given key ("name") that exists on the descriptor', () => {
		const newField: DynamicField = { name: "newField", type: "title" };
		testDesc.insert(newField, "sample");
		expect(testDesc.descriptor).toEqual([
			testDesc.name,
			newField,
			testDesc.sample,
			testDesc.category
		]);
	});

	it('should throw error when inserting a Dynamic field given a key ("name") if that given key does not exists', () => {
		const newField: DynamicField = { name: "newField", type: "title" };
		expect(() => testDesc.insert(newField, "doesntExist")).toThrowError(Error);
	});

	it('should throw error when inserting a Dynamic field if the Dynamic field does not have key ("name")', () => {
		const newField: DynamicField = { type: "title" };
		expect(() => testDesc.insert(newField, "sample")).toThrowError(Error);
	});

	it('should not insert a Dynamic field above a given key ("name") that does not exists on the descriptor', () => {
		const newField: DynamicField = { name: "newField", type: "title" };
		expect(() => testDesc.insert(newField, "doesntExist")).toThrowError(Error);
	});

	// insert blank
	it('should insert a empty field above a given key ("name") that exists on the descriptor', () => {
		testDesc.insertBlank("sample");
		expect(testDesc.descriptor).toEqual([
			testDesc.name,
			testDesc.emptyField,
			testDesc.sample,
			testDesc.category
		]);
	});
});

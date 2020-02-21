import { UserNamePipe } from "./user-name.pipe";

xdescribe("UserNamePipe", () => {
	let pipe: UserNamePipe;

	beforeEach(async () => {
		pipe = new UserNamePipe();
	});

	it('transform ({firstName: undefined, lastName: undefined}) to ""', () => {
		expect(pipe.transform({ firstName: undefined, lastName: undefined })).toBe(
			""
		);
	});

	it('transform ({firstName: undefined, lastName: "Platini"}) to ""', () => {
		expect(pipe.transform({ firstName: undefined, lastName: "Platini" })).toBe(
			""
		);
	});

	it('transform ({firstName: "Michel", lastName: undefined}) to ""', () => {
		expect(pipe.transform({ firstName: "Michel", lastName: undefined })).toBe(
			""
		);
	});

	it('transform ({firstName: "Michel", lastName: "Platini"}) to "Michel P"', () => {
		expect(
			pipe.transform({ firstName: "Michel", lastName: "Platini" })
		).toContain("Michel P");
	});

	it('transform ({firstName: "Michel", lastName: "platini"}) to "Michel P"', () => {
		expect(
			pipe.transform({ firstName: "Michel", lastName: "platini" })
		).toContain("Michel P");
	});
});

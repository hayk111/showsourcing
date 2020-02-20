import { FileSizePipe } from "./file-size.pipe";

xdescribe("FileSizePipe", () => {
	let pipe: FileSizePipe;

	const countDecimals = (stringData: string) => {
		const array = stringData.split(" ");
		if (array && array.length) {
			return array[0].split(".")[1] ? array[0].split(".")[1].length : 0;
		} else return 0;
	};
	beforeEach(() => {
		pipe = new FileSizePipe();
	});

	it('transform ("undefined, undefined") to "?"', () => {
		expect(pipe.transform(null, undefined)).toContain("?");
	});

	it('transform (NaN, undefined) to "?"', () => {
		expect(pipe.transform(NaN, undefined)).toContain("?");
	});

	it('transform (null, undefined) to "?"', () => {
		expect(pipe.transform(null, undefined)).toContain("?");
	});

	it('transform (num, undefined) to "xx.xx b"', () => {
		const num = Math.floor(Math.random() * 1024);
		const result = pipe.transform(num, undefined);
		if (countDecimals(result) !== 2) {
			fail(`Decimals is wrong, expect ${countDecimals(result)} to be 2`);
		}
		expect(result).toContain(" b");
	});

	it('transform (num, 1) to "xx.x b"', () => {
		const num = Math.floor(Math.random() * 1024);
		const result = pipe.transform(num, 1);
		if (countDecimals(result) !== 1) {
			fail(`Decimals is wrong, expect ${countDecimals(result)} to be 2`);
		}
		expect(result).toContain(" b");
	});

	it('transform (num, 0) to "xx b"', () => {
		const num = Math.floor(Math.random() * 1024);
		const result = pipe.transform(num, 0);
		if (countDecimals(result) !== 0) {
			fail(`Decimals is wrong, expect ${countDecimals(result)} to be 2`);
		}
		expect(result).toContain(" b");
	});

	it('transform (num) to "xx.xx KB"', () => {
		const num = Math.floor(Math.random() * Math.pow(1024, 2)) + 1024;
		const result = pipe.transform(num);
		if (countDecimals(result) !== 2) {
			fail(`Decimals is wrong, expect ${countDecimals(result)} to be 2`);
		}
		expect(result).toContain("KB");
	});

	it('transform (num) to "xx MB"', () => {
		const num = Math.floor(Math.random() * Math.pow(1024, 3)) + 1024;
		const result = pipe.transform(num);
		if (countDecimals(result) !== 2) {
			fail(`Decimals is wrong, expect ${countDecimals(result)} to be 2`);
		}
		expect(result).toContain("MB");
	});

	it('transform (num) to "xx.xx MB"', () => {
		const num = Math.floor(Math.random() * Math.pow(1024, 3)) + 1024;
		const result = pipe.transform(num);
		if (countDecimals(result) !== 2) {
			fail(`Decimals is wrong, expect ${countDecimals(result)} to be 2`);
		}
		expect(result).toContain("MB");
	});

	it('transform (num) to "xx.xx GB"', () => {
		const num = Math.floor(Math.random() * Math.pow(1024, 4)) + 1024;
		const result = pipe.transform(num);
		if (countDecimals(result) !== 2) {
			fail(`Decimals is wrong, expect ${countDecimals(result)} to be 2`);
		}
		expect(result).toContain("GB");
	});

	it('transform (num) to "xx.xx TB"', () => {
		const num = Math.floor(Math.random() * Math.pow(1024, 5)) + 1024;
		const result = pipe.transform(num);
		if (countDecimals(result) !== 2) {
			fail(`Decimals is wrong, expect ${countDecimals(result)} to be 2`);
		}
		expect(result).toContain("TB");
	});

	it('transform (num) to "xx.xx PB"', () => {
		const num = Math.floor(Math.random() * Math.pow(1024, 6)) + 1024;
		const result = pipe.transform(num);
		if (countDecimals(result) !== 2) {
			fail(`Decimals is wrong, expect ${countDecimals(result)} to be 2`);
		}
		expect(result).toContain("PB");
	});
});

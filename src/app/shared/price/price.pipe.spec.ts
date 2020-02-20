import { PricePipe } from "./price.pipe";

/** price on the back end are actually stored as 10000 times their display value */
xdescribe("PricePipe", () => {
	const pipe = new PricePipe("en-US");

	it('transforms undefined to "-"', () => {
		expect(pipe.transform(undefined)).toBe("-");
	});

	it('transforms { value: 50000, currency: "USD"} to "$5"', () => {
		// expect(pipe.transform({ value: 50000, currency: "USD" })).toBe("$5");
	});

	it('transforms { value: 55680, currency: "USD"} to "$5.57"', () => {
		// expect(pipe.transform({ value: 55680, currency: "USD" })).toBe("$5.57");
	});

	it('transforms { value: 6000000, currency: "EUR"} to "€600"', () => {
		// expect(pipe.transform({ value: 6000000, currency: "EUR" })).toBe("€600");
	});
});

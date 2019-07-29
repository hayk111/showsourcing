import { ConstPipe } from './const.pipe';

describe('ConstPipe', () => {

	const pipe = new ConstPipe('en-US');

	beforeAll(async () => {
		console.log('language en-US');
	});

	// currency
	it('transform ("DEM", "currency", "name") to "German Mark"', () => {
		expect(pipe.transform('DEM', 'currency', 'name')).toBe('German Mark');
	});

	it('transform ("AYM", "currency", "symbol") to "AYM"', () => {
		expect(pipe.transform('AYM', 'currency', 'symbol')).toBe('AYM');
	});

	it('transform ("SRD", "currency", undefined) to "Surinamese Dollar"', () => {
		expect(pipe.transform('SRD', 'currency')).toBe('Surinamese Dollar');
	});

	// currencies
	it('transform ("DEM", "currencies", "name") to "German Mark"', () => {
		expect(pipe.transform('DEM', 'currencies', 'name')).toBe('German Mark');
	});

	it('transform ("AYM", "currencies", "symbol") to "AYM"', () => {
		expect(pipe.transform('AYM', 'currencies', 'symbol')).toBe('AYM');
	});

	it('transform ("PHP", "currencies", undefined) to "Philippine Peso"', () => {
		expect(pipe.transform('PHP', 'currencies')).toBe('Philippine Peso');
	});

	// country
	it('transform ("AZ", "country", "name") to "Azerbaijan"', () => {
		expect(pipe.transform('AZ', 'country', 'name')).toBe('Azerbaijan');
	});

	it('transform ("VN", "country", "isoCode") to "VN"', () => {
		expect(pipe.transform('VN', 'country', 'isoCode')).toBe('VN');
	});

	it('transform ("ZM", "country", undefined) to "Zambia"', () => {
		expect(pipe.transform('ZM', 'country')).toBe('Zambia');
	});

	// countries
	it('transform ("TN", "countries", "name") to "Tunisia"', () => {
		expect(pipe.transform('TN', 'countries', 'name')).toBe('Tunisia');
	});

	it('transform ("ST", "countries", "isoCode") to "ST"', () => {
		expect(pipe.transform('ST', 'countries', 'isoCode')).toBe('ST');
	});

	it('transform ("RS", "countries", undefined) to "Serbia"', () => {
		expect(pipe.transform('RS', 'countries')).toBe('Serbia');
	});

	// habour
	it('transform ("Algeciras", "habour", "name") to "Algeciras"', () => {
		expect(pipe.transform('Algeciras', 'habour', 'name')).toBe('Algeciras');
	});

	it('transform ("Houston", "habour", undefined) to "Houston"', () => {
		expect(pipe.transform('Houston', 'habour')).toBe('Houston');
	});

	// harbours
	it('transform ("Laem Chabang", "harbours", "name") to "Laem Chabang"', () => {
		expect(pipe.transform('Laem Chabang', 'harbours', 'name')).toBe('Laem Chabang');
	});

	it('transform ("Tanger-Med (Tangiers)", "harbours", undefined) to "Tanger-Med (Tangiers)"', () => {
		expect(pipe.transform('Tanger-Med (Tangiers)', 'harbours')).toBe('Tanger-Med (Tangiers)');
	});

	// incoTerm
	it('transform ("CFR", "incoTerm", "name") to "CFR"', () => {
		expect(pipe.transform('CFR', 'incoTerm', 'name')).toBe('CFR');
	});

	it('transform ("CPT", "incoTerm", undefined) to "CPT"', () => {
		expect(pipe.transform('CPT', 'incoTerm')).toBe('CPT');
	});

	// incoTerms
	it('transform ("DAP", "incoTerms", "name") to "DAP"', () => {
		expect(pipe.transform('DAP', 'incoTerms', 'name')).toBe('DAP');
	});

	it('transform ("CIF", "incoTerms", undefined) to "CIF"', () => {
		expect(pipe.transform('CIF', 'incoTerms')).toBe('CIF');
	});

	// status
	it('transform ("_New", "status", "name") to "New Product"', () => {
		expect(pipe.transform('_New', 'status', 'name')).toBe('New Product');
	});

	it('transform ("_NewSupplierstatus", "status", undefined) to "New Supplier"', () => {
		expect(pipe.transform('_NewSupplierstatus', 'status')).toBe('New Supplier');
	});

	// statuses
	it('transform ("_UnderAssessment", "statuses", "name") to "Under Assessment"', () => {
		expect(pipe.transform('_UnderAssessment', 'statuses', 'name')).toBe('Under Assessment');
	});

	it('transform ("_Overdue", "statuses", undefined) to "Overdue"', () => {
		expect(pipe.transform('_Overdue', 'statuses')).toBe('Overdue');
	});

	// statusCategory
	it('transform ("inProgress", "statusCategory", "name") to "In Progress"', () => {
		expect(pipe.transform('inProgress', 'statusCategory', 'name')).toBe('In Progress');
	});

	it('transform ("validated", "statusCategory", undefined) to "Validated"', () => {
		expect(pipe.transform('validated', 'statusCategory')).toBe('Validated');
	});

	// statusCategories
	it('transform ("refused", "statusCategories", "name") to "Refused"', () => {
		expect(pipe.transform('refused', 'statusCategories', 'name')).toBe('Refused');
	});

	it('transform ("inProgress", "statusCategories", undefined) to "In Progress"', () => {
		expect(pipe.transform('inProgress', 'statusCategories')).toBe('In Progress');
	});

	// statusRequestSupplier
	it('transform ("resent", "statusRequestSupplier", "name") to "Sent Back from buyer"', () => {
		expect(pipe.transform('resent', 'statusRequestSupplier', 'name')).toBe('Sent Back from buyer');
	});

	it('transform ("canceled", "statusRequestSupplier", undefined) to "Canceled"', () => {
		expect(pipe.transform('canceled', 'statusRequestSupplier')).toBe('Canceled');
	});

	// statusRequestsSupplier
	it('transform ("pending", "statusRequestsSupplier", "name") to "To Reply"', () => {
		expect(pipe.transform('pending', 'statusRequestsSupplier', 'name')).toBe('To Reply');
	});

	it('transform ("sent", "statusRequestsSupplier", undefined) to "To Reply"', () => {
		expect(pipe.transform('sent', 'statusRequestsSupplier')).toBe('To Reply');
	});

	// statusRequestTeam
	it('transform ("resent", "statusRequestTeam", "name") to "Sent Back to supplier"', () => {
		expect(pipe.transform('resent', 'statusRequestTeam', 'name')).toBe('Sent Back to supplier');
	});

	it('transform ("canceled", "statusRequestTeam", undefined) to "Canceled"', () => {
		expect(pipe.transform('canceled', 'statusRequestTeam')).toBe('Canceled');
	});

	// statusRequestsTeam
	it('transform ("validated", "statusRequestsTeam", "name") to "Validated"', () => {
		expect(pipe.transform('validated', 'statusRequestsTeam', 'name')).toBe('Validated');
	});

	it('transform ("sent", "statusRequestsTeam", undefined) to "Sent to supplier"', () => {
		expect(pipe.transform('sent', 'statusRequestsTeam')).toBe('Sent to supplier');
	});

	// supplierType
	it('transform ("_Manufacturer", "supplierType", "name") to "Manufacturer"', () => {
		expect(pipe.transform('_Manufacturer', 'supplierType', 'name')).toBe('Manufacturer');
	});

	it('transform ("_Supplier", "supplierType", undefined) to "Supplier"', () => {
		expect(pipe.transform('_Supplier', 'supplierType')).toBe('Supplier');
	});

	// supplierTypes
	it('transform ("_Trader", "supplierTypes", "name") to "Trader"', () => {
		expect(pipe.transform('_Trader', 'supplierTypes', 'name')).toBe('Trader');
	});

	it('transform ("_Manufacturer", "supplierTypes", undefined) to "Manufacturer"', () => {
		expect(pipe.transform('_Manufacturer', 'supplierTypes')).toBe('Manufacturer');
	});

	// erm
	it('transform ("categories", "erm", "name") to "categories"', () => {
		expect(pipe.transform('categories', 'erm', 'name')).toBe('categories');
	});

	it('transform ("price", "erm", undefined) to "price"', () => {
		expect(pipe.transform('price', 'erm')).toBe('price');
	});

	// messages
	it('transform ("Already have an account?", "messages", "name") to "Already have an account?"', () => {
		expect(pipe.transform('Already have an account?', 'messages', 'name')).toBe('Already have an account?');
	});

	it('transform ("Don\'t have an account ?", "messages", undefined) to "Don\'t have an account ?"', () => {
		expect(pipe.transform('Don\'t have an account ?', 'messages')).toBe('Don\'t have an account ?');
	});

	// will return value
	it('transform ("test 12345", undefined, undefined) to "test 12345"', () => {
		expect(pipe.transform('test 12345')).toBe('test 12345');
	});
});

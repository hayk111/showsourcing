import { ConstPipe } from './const.pipe';

describe('ConstPipe', () => {

	const pipe = new ConstPipe('en-US');

	beforeAll(async () => {
		console.log('language en-US');
	});

	// currency
	it('transforms ("DEM", "currency", "name") to "German Mark"', () => {
		expect(pipe.transform('DEM', 'currency', 'name')).toBe('German Mark');
	});

	it('transforms ("AYM", "currency", "symbol") to "AYM"', () => {
		expect(pipe.transform('AYM', 'currency', 'symbol')).toBe('AYM');
	});

	it('transforms ("SRD", "currency", undefined) to "Surinamese Dollar"', () => {
		expect(pipe.transform('SRD', 'currency')).toBe('Surinamese Dollar');
	});

	// currencies
	it('transforms ("DEM", "currencies", "name") to "German Mark"', () => {
		expect(pipe.transform('DEM', 'currencies', 'name')).toBe('German Mark');
	});

	it('transforms ("AYM", "currencies", "symbol") to "AYM"', () => {
		expect(pipe.transform('AYM', 'currencies', 'symbol')).toBe('AYM');
	});

	it('transforms ("PHP", "currencies", undefined) to "Philippine Peso"', () => {
		expect(pipe.transform('PHP', 'currencies')).toBe('Philippine Peso');
	});

	// country
	it('transforms ("AZ", "country", "name") to "Azerbaijan"', () => {
		expect(pipe.transform('AZ', 'country', 'name')).toBe('Azerbaijan');
	});

	it('transforms ("VN", "country", "isoCode") to "VN"', () => {
		expect(pipe.transform('VN', 'country', 'isoCode')).toBe('VN');
	});

	it('transforms ("ZM", "country", undefined) to "Zambia"', () => {
		expect(pipe.transform('ZM', 'country')).toBe('Zambia');
	});

	// countries
	it('transforms ("TN", "countries", "name") to "Tunisia"', () => {
		expect(pipe.transform('TN', 'countries', 'name')).toBe('Tunisia');
	});

	it('transforms ("ST", "countries", "isoCode") to "ST"', () => {
		expect(pipe.transform('ST', 'countries', 'isoCode')).toBe('ST');
	});

	it('transforms ("RS", "countries", undefined) to "Serbia"', () => {
		expect(pipe.transform('RS', 'countries')).toBe('Serbia');
	});

	// habour
	it('transforms ("Algeciras", "habour", "name") to "Algeciras"', () => {
		expect(pipe.transform('Algeciras', 'habour', 'name')).toBe('Algeciras');
	});

	it('transforms ("Houston", "habour", undefined) to "Houston"', () => {
		expect(pipe.transform('Houston', 'habour')).toBe('Houston');
	});

	// harbours
	it('transforms ("Laem Chabang", "harbours", "name") to "Laem Chabang"', () => {
		expect(pipe.transform('Laem Chabang', 'harbours', 'name')).toBe('Laem Chabang');
	});

	it('transforms ("Tanger-Med (Tangiers)", "harbours", undefined) to "Tanger-Med (Tangiers)"', () => {
		expect(pipe.transform('Tanger-Med (Tangiers)', 'harbours')).toBe('Tanger-Med (Tangiers)');
	});

	// incoTerm
	it('transforms ("CFR", "incoTerm", "name") to "CFR"', () => {
		expect(pipe.transform('CFR', 'incoTerm', 'name')).toBe('CFR');
	});

	it('transforms ("CPT", "incoTerm", undefined) to "CPT"', () => {
		expect(pipe.transform('CPT', 'incoTerm')).toBe('CPT');
	});

	// incoTerms
	it('transforms ("DAP", "incoTerms", "name") to "DAP"', () => {
		expect(pipe.transform('DAP', 'incoTerms', 'name')).toBe('DAP');
	});

	it('transforms ("CIF", "incoTerms", undefined) to "CIF"', () => {
		expect(pipe.transform('CIF', 'incoTerms')).toBe('CIF');
	});

	// status
	it('transforms ("_New", "status", "name") to "New Product"', () => {
		expect(pipe.transform('_New', 'status', 'name')).toBe('New Product');
	});

	it('transforms ("_NewSupplierstatus", "status", undefined) to "New Supplier"', () => {
		expect(pipe.transform('_NewSupplierstatus', 'status')).toBe('New Supplier');
	});

	// statuses
	it('transforms ("_UnderAssessment", "statuses", "name") to "Under Assessment"', () => {
		expect(pipe.transform('_UnderAssessment', 'statuses', 'name')).toBe('Under Assessment');
	});

	it('transforms ("_Overdue", "statuses", undefined) to "Overdue"', () => {
		expect(pipe.transform('_Overdue', 'statuses')).toBe('Overdue');
	});

	// statusCategory
	it('transforms ("inProgress", "statusCategory", "name") to "In Progress"', () => {
		expect(pipe.transform('inProgress', 'statusCategory', 'name')).toBe('In Progress');
	});

	it('transforms ("validated", "statusCategory", undefined) to "Validated"', () => {
		expect(pipe.transform('validated', 'statusCategory')).toBe('Validated');
	});

	// statusCategories
	it('transforms ("refused", "statusCategories", "name") to "Refused"', () => {
		expect(pipe.transform('refused', 'statusCategories', 'name')).toBe('Refused');
	});

	it('transforms ("inProgress", "statusCategories", undefined) to "In Progress"', () => {
		expect(pipe.transform('inProgress', 'statusCategories')).toBe('In Progress');
	});

	// statusRequestSupplier
	it('transforms ("resent", "statusRequestSupplier", "name") to "Sent Back from buyer"', () => {
		expect(pipe.transform('resent', 'statusRequestSupplier', 'name')).toBe('Sent Back from buyer');
	});

	it('transforms ("canceled", "statusRequestSupplier", undefined) to "Canceled"', () => {
		expect(pipe.transform('canceled', 'statusRequestSupplier')).toBe('Canceled');
	});

	// statusRequestsSupplier
	it('transforms ("pending", "statusRequestsSupplier", "name") to "To Reply"', () => {
		expect(pipe.transform('pending', 'statusRequestsSupplier', 'name')).toBe('To Reply');
	});

	it('transforms ("sent", "statusRequestsSupplier", undefined) to "To Reply"', () => {
		expect(pipe.transform('sent', 'statusRequestsSupplier')).toBe('To Reply');
	});

	// statusRequestTeam
	it('transforms ("resent", "statusRequestTeam", "name") to "Sent Back to supplier"', () => {
		expect(pipe.transform('resent', 'statusRequestTeam', 'name')).toBe('Sent Back to supplier');
	});

	it('transforms ("canceled", "statusRequestTeam", undefined) to "Canceled"', () => {
		expect(pipe.transform('canceled', 'statusRequestTeam')).toBe('Canceled');
	});

	// statusRequestsTeam
	it('transforms ("validated", "statusRequestsTeam", "name") to "Validated"', () => {
		expect(pipe.transform('validated', 'statusRequestsTeam', 'name')).toBe('Validated');
	});

	it('transforms ("sent", "statusRequestsTeam", undefined) to "Sent to supplier"', () => {
		expect(pipe.transform('sent', 'statusRequestsTeam')).toBe('Sent to supplier');
	});

	// supplierType
	it('transforms ("_Manufacturer", "supplierType", "name") to "Manufacturer"', () => {
		expect(pipe.transform('_Manufacturer', 'supplierType', 'name')).toBe('Manufacturer');
	});

	it('transforms ("_Supplier", "supplierType", undefined) to "Supplier"', () => {
		expect(pipe.transform('_Supplier', 'supplierType')).toBe('Supplier');
	});

	// supplierTypes
	it('transforms ("_Trader", "supplierTypes", "name") to "Trader"', () => {
		expect(pipe.transform('_Trader', 'supplierTypes', 'name')).toBe('Trader');
	});

	it('transforms ("_Manufacturer", "supplierTypes", undefined) to "Manufacturer"', () => {
		expect(pipe.transform('_Manufacturer', 'supplierTypes')).toBe('Manufacturer');
	});

	// erm
	it('transforms ("categories", "erm", "name") to "categories"', () => {
		expect(pipe.transform('categories', 'erm', 'name')).toBe('categories');
	});

	it('transforms ("price", "erm", undefined) to "price"', () => {
		expect(pipe.transform('price', 'erm')).toBe('price');
	});

	// messages
	it('transforms ("Already have an account?", "messages", "name") to "Already have an account?"', () => {
		expect(pipe.transform('Already have an account?', 'messages', 'name')).toBe('Already have an account?');
	});

	it('transforms ("Don\'t have an account ?", "messages", undefined) to "Don\'t have an account ?"', () => {
		expect(pipe.transform('Don\'t have an account ?', 'messages')).toBe('Don\'t have an account ?');
	});

	// will return value
	it('transforms ("test 12345", undefined, undefined) to "test 12345"', () => {
		expect(pipe.transform('test 12345')).toBe('test 12345');
	});
});

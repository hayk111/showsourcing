import { SearchAutocompleteModule } from './search-autocomplete.module';

describe('SearchAutocompleteModule', () => {
	let searchAutocompleteModule: SearchAutocompleteModule;

	beforeEach(() => {
		searchAutocompleteModule = new SearchAutocompleteModule();
	});

	it('should create an instance', () => {
		expect(searchAutocompleteModule).toBeTruthy();
	});
});

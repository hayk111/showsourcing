import { ShowsModule } from '~features/shows/shows.module';

describe('ShowsModule', () => {
	let showsModule: ShowsModule;

	beforeEach(() => {
		showsModule = new ShowsModule();
	});

	it('should create an instance', () => {
		expect(showsModule).toBeTruthy();
	});
});

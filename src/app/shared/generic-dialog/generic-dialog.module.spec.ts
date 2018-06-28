import { GenericDialogModule } from './generic-dialog.module';

describe('GenericDialogModule', () => {
	let genericDialogModule: GenericDialogModule;

	beforeEach(() => {
		genericDialogModule = new GenericDialogModule();
	});

	it('should create an instance', () => {
		expect(genericDialogModule).toBeTruthy();
	});
});

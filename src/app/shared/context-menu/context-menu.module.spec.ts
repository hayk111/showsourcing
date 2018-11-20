import { ContextMenuModule } from '~shared/context-menu/context-menu.module';

describe('ContextMenuModule', () => {
	let contextMenuModule: ContextMenuModule;

	beforeEach(() => {
		contextMenuModule = new ContextMenuModule();
	});

	it('should create an instance', () => {
		expect(contextMenuModule).toBeTruthy();
	});
});

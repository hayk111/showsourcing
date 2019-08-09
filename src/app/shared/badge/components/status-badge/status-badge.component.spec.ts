import { StatusBadgeComponent } from './status-badge.component';


fdescribe('Status Badge component', () => {

	let badge: StatusBadgeComponent;

	beforeEach(async () => {
		badge = new StatusBadgeComponent();
	});

	it('should be warn color when rejected', () => {
		badge.status = { category: 'refused'};
		expect(badge.getType()).toEqual('warn');
	});

	it('should be success color when validated', () => {
		badge.status = { category: 'validated'};
		expect(badge.getType()).toEqual('success');
	});

	it('should be secondary color when no status or category new', () => {
		badge.status = 	{ category: 'new'};
		expect(badge.getType()).toEqual('secondary');
		badge.status = null;
		expect(badge.getType()).toEqual('secondary');
		badge.status = undefined;
		expect(badge.getType()).toEqual('secondary');
	});

	it('should be primary color when in progress', () => {
		badge.status = { category: 'inProgress'};
		expect(badge.getType()).toEqual('primary');
	});
});

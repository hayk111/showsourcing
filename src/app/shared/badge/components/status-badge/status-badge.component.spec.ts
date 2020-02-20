import { StatusCategory, StatusUtils } from "~utils";

import { StatusBadgeComponent } from "./status-badge.component";

xdescribe("Status Badge component", () => {
	let badge: StatusBadgeComponent;

	beforeEach(async () => {
		badge = new StatusBadgeComponent();
	});

	it("should be warn color when rejected", () => {
		badge.status = { category: StatusCategory.REFUSED };
		expect(badge.statusUtils.getStatusColor(badge.status)).toEqual(
			StatusUtils.statusColorMap[badge.status.category]
		);
	});

	it("should be success color when validated", () => {
		badge.status = { category: StatusCategory.VALIDATED };
		expect(badge.statusUtils.getStatusColor(badge.status)).toEqual(
			StatusUtils.statusColorMap[badge.status.category]
		);
	});

	it("should be secondary color when no status or category new", () => {
		badge.status = { category: StatusCategory.NEW };
		expect(badge.statusUtils.getStatusColor(badge.status)).toEqual(
			StatusUtils.statusColorMap[badge.status.category]
		);
		badge.status = null;
		expect(badge.statusUtils.getStatusColor(badge.status)).toEqual(
			StatusUtils.DEFAULT_STATUS_COLOR
		);
		badge.status = undefined;
		expect(badge.statusUtils.getStatusColor(badge.status)).toEqual(
			StatusUtils.DEFAULT_STATUS_COLOR
		);
	});

	it("should be primary color when in progress", () => {
		badge.status = { category: StatusCategory.IN_PROGRESS };
		expect(badge.statusUtils.getStatusColor(badge.status)).toEqual(
			StatusUtils.statusColorMap[badge.status.category]
		);
	});
});
